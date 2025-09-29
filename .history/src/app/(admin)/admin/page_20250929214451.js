"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, LogOut, Calendar, MapPin, Settings } from 'lucide-react';
import {
  getAllResultsWithMeta,
  createResult,
  updateResult,
  deleteResult,
  validateResultData
} from '@/services/result';
import SiteConfig from '@/components/SiteConfig';
import { GAMES, GAME_OPTIONS } from '@/utils/gameConfig';

function getISTDateForForm() {
  const date = new Date();
  date.setTime(date.getTime() + (5.5 * 60 * 60 * 1000));
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const AdminDashboard = () => {
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState({
    game: '',
    resultNumber: '',
    waitingGame: '',
    date: getISTDateForForm()

  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Site Configuration State
  const [showConfig, setShowConfig] = useState(false);

  // Bulk import states
  const [bulkData, setBulkData] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  const router = useRouter();

  // Filter waiting game options (exclude currently selected game)
  const waitingGameOptions = GAME_OPTIONS.filter(game => game.value !== formData.game);

  const monthMapping = {
    'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
    'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
    'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    loadResults();
  }, [router]);

  const loadResults = async () => {
    try {
      setFetchLoading(true);
      const data = await getAllResultsWithMeta();
      setResults(data);
    } catch (error) {
      console.error('Failed to load results:', error);
      setResults([]);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateResultData(formData);
    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        await updateResult(editingId, formData);
      } else {
        await createResult(formData);
      }

      await loadResults();

      // Reset form
      setFormData({
        game: '',
        resultNumber: '',
        waitingGame: '',
        date: getISTDateForForm()

      });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving result:', error);
      alert('Failed to save result. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      game: item.game,
      resultNumber: item.resultNumber,
      waitingGame: item.waitingGame || '',
      date: item.date
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this result?')) {
      try {
        await deleteResult(id);
        await loadResults();
      } catch (error) {
        console.error('Error deleting result:', error);
        alert('Failed to delete result. Please try again.');
      }
    }
  };

  const getGameTitle = (value) => {
    return GAME_OPTIONS.find(game => game.value === value)?.title || value;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      game: '',
      resultNumber: '',
      waitingGame: '',
      date: getISTDateForForm()

    });
  };

  const handleBulkImport = async () => {
    setBulkLoading(true);
    setImportStatus(null);

    try {
      const data = JSON.parse(bulkData);

      if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
      }

      let imported = 0;
      let skipped = 0;
      let errors = 0;

      const batchSize = 10;
      const totalBatches = Math.ceil(data.length / batchSize);

      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const batch = data.slice(batchIndex * batchSize, (batchIndex + 1) * batchSize);

        setImportStatus({
          type: 'progress',
          message: `Processing batch ${batchIndex + 1} of ${totalBatches} (${Math.round((batchIndex / totalBatches) * 100)}%)`
        });

        const batchPromises = batch.map(async (item) => {
          try {
            const monthNum = monthMapping[item.month.toUpperCase()];
            if (!monthNum) {
              return { status: 'error', reason: `Invalid month: ${item.month}` };
            }

            const date = `${item.year}-${monthNum}-${String(item.day).padStart(2, '0')}`;

            await createResult({
              game: item.city || item.game,
              resultNumber: item.result,
              date: date,
              waitingGame: getRandomWaitingGame(item.city || item.game)
            });

            return { status: 'success', data: `${item.city || item.game} ${date}` };

          } catch (error) {
            if (error.message.includes('already exists') || error.message.includes('unique')) {
              return { status: 'skipped', reason: 'Already exists' };
            } else {
              return { status: 'error', reason: error.message };
            }
          }
        });

        const batchResults = await Promise.all(batchPromises);

        batchResults.forEach(result => {
          if (result.status === 'success') imported++;
          else if (result.status === 'skipped') skipped++;
          else if (result.status === 'error') errors++;
        });

        // console.log(`Batch ${batchIndex + 1}/${totalBatches} completed - Imported: ${imported}, Skipped: ${skipped}, Errors: ${errors}`);

        if (batchIndex < totalBatches - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      await loadResults();

      setImportStatus({
        type: 'success',
        message: `Import completed! Imported: ${imported}, Skipped: ${skipped}, Errors: ${errors} out of ${data.length} total records`
      });

      setBulkData('');

    } catch (error) {
      console.error('Bulk import error:', error);
      setImportStatus({
        type: 'error',
        message: `Import failed: ${error.message}`
      });
    } finally {
      setBulkLoading(false);
    }
  };

  const getRandomWaitingGame = (currentGame) => {
    const availableGames = GAMES.filter(game => game.key !== currentGame);
    return availableGames[Math.floor(Math.random() * availableGames.length)]?.key || 'disawar';
  };

  // Callback when site config is saved
  const onConfigSaved = () => {
    // console.log('Site configuration has been saved!');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradientmidyellow3 sm:size-10 size-8 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <div className="text-white font-bold">A</div>
              </div>
              <div>
                <h1 className="roboto text-white text-base sm:text-xl">Admin Panel</h1>
                <p className="text-white/60 sm:text-sm text-xs">Welcome back, {user.username}</p>
              </div>
            </div>
            <div className="flex items-center sm:space-x-3">
              <button
                onClick={() => setShowConfig(true)}
                className="flex items-center text-white/80 hover:text-white gap-2 max-sm:text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Settings size={16} />
                Site Config
              </button>
              <button
                onClick={logout}
                className="flex items-center text-white/80 hover:text-white px-2 sm:px-3 py-2 rounded-lg gap-2 hover:bg-white/10 transition-colors"
              >
                <LogOut size={16} />
                <span className='max-sm:hidden'>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Site Configuration Component */}
      <SiteConfig
        showConfig={showConfig}
        setShowConfig={setShowConfig}
        onConfigSaved={onConfigSaved}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add/Edit Form */}
          <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h2 className="roboto text-white text-xl mb-6 flex items-center">
              <Plus size={20} className="mr-2" />
              {editingId ? 'Edit Result' : 'Add New Result'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Game *
                </label>
                <div className="relative">
                  <select
                    value={formData.game}
                    onChange={(e) => setFormData({
                      ...formData,
                      game: e.target.value,
                      waitingGame: e.target.value === formData.waitingGame ? '' : formData.waitingGame
                    })}
                    className="w-full px-4 py-3 pr-10 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 appearance-none cursor-pointer"
                    required
                    disabled={loading}
                  >
                    <option value="" className="text-black bg-white">Select Game</option>
                    {GAME_OPTIONS.map(game => (
                      <option key={game.value} value={game.value} className="text-black bg-white">
                        {game.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Result Number *
                </label>
                <input
                  type="number"
                  value={formData.resultNumber}
                  onChange={(e) => setFormData({ ...formData, resultNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
                  placeholder="Enter result number (e.g., 45)"
                  required
                  disabled={loading}
                  pattern="\d+"
                  title="Please enter numbers only"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Waiting Game *
                </label>
                <div className="relative">
                  <select
                    value={formData.waitingGame}
                    onChange={(e) => setFormData({ ...formData, waitingGame: e.target.value })}
                    className="w-full px-4 py-3 pr-10 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 appearance-none cursor-pointer"
                    required
                    disabled={loading || !formData.game}
                  >
                    <option value="" className="text-black bg-white">Select Waiting Game</option>
                    {waitingGameOptions.map(game => (
                      <option key={game.value} value={game.value} className="text-black bg-white">
                        {game.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading || !formData.game || !formData.resultNumber || !formData.waitingGame || !formData.date}
                  className="flex-1 bg-gradientmidyellow text-white py-3 px-4 rounded-lg roboto hover:opacity-90 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {editingId ? 'Updating...' : 'Adding...'}
                    </div>
                  ) : (
                    editingId ? 'Update Result' : 'Add Result'
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Results List */}
          <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h2 className="roboto text-white text-xl mb-6">
              Recent Results
            </h2>

            {fetchLoading ? (
              <div className="text-center text-white/60 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading results...</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 p-1 overflow-y-auto">
                {results.length === 0 ? (
                  <div className="text-center text-white/60 py-8">
                    <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No results added yet</p>
                    <p className="text-sm mt-2">Add your first result using the form</p>
                  </div>
                ) : (
                  results.slice(0, 10).map(item => (
                    <div key={item._id} className={`bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-colors ${editingId === item._id ? 'ring-2 ring-yellow-400' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <MapPin size={16} className="text-yellow-400 mr-2" />
                            <span className="text-white font-medium">{getGameTitle(item.game)}</span>
                            <span className="ml-2 px-3 py-1 bg-gradientmidyellow4 text-white text-sm font-bold rounded-full">
                              {item.resultNumber}
                            </span>
                          </div>
                          {item.waitingGame && (
                            <div className="text-white/70 text-sm mb-2">
                              Waiting: <span className="text-white/90">{getGameTitle(item.waitingGame)}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Calendar size={14} className="text-white/50 mr-1" />
                            <span className="text-white/60 text-sm">{item.date}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-yellow-400 hover:bg-yellow-400/20 rounded-lg transition-colors"
                            disabled={loading}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                            disabled={loading}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bulk Import Section */}
        {/* <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mt-8">
          <h2 className="roboto text-white text-xl mb-6">
            Bulk Import Historical Data
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Paste JSON Data ({bulkData ? JSON.parse(bulkData || '[]').length || 0 : 0} records)
              </label>
              <textarea
                value={bulkData}
                onChange={(e) => setBulkData(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 h-32 font-mono text-sm"
                placeholder='Paste extracted data here... [{"game": "disawar", "day": "01", "month": "JAN", "result": "45", "year": "2024"}]'
                disabled={bulkLoading}
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleBulkImport}
                disabled={bulkLoading || !bulkData.trim()}
                className="flex-1 bg-gradient2 text-white py-3 px-4 rounded-lg roboto hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bulkLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Importing...
                  </div>
                ) : (
                  'Import Historical Data (Fast Mode)'
                )}
              </button>

              {bulkData && (
                <button
                  onClick={() => setBulkData('')}
                  disabled={bulkLoading}
                  className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {importStatus && (
              <div className={`p-4 rounded-lg border ${importStatus.type === 'success'
                ? 'bg-green-500/20 text-green-200 border-green-500/30'
                : importStatus.type === 'progress'
                  ? 'bg-blue-500/20 text-blue-200 border-blue-500/30'
                  : 'bg-red-500/20 text-red-200 border-red-500/30'
                }`}>
                <div className="flex items-center">
                  {importStatus.type === 'progress' && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-3"></div>
                  )}
                  <span>{importStatus.message}</span>
                </div>
              </div>
            )}

            <div className="text-white/60 text-sm">
              <p><strong>Performance Tips:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Processes 10 records at once (instead of one by one)</li>
                <li>No delay between individual records</li>
                <li>Should import 366 records in ~30-60 seconds</li>
                <li>Automatically skips duplicates</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;