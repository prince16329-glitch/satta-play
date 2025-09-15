"use client";
import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '@/services/result';

const SiteConfig = ({ showConfig, setShowConfig, onConfigSaved }) => {
    const [configLoading, setConfigLoading] = useState(false);

    const [siteConfig, setSiteConfig] = useState({
        // Site 1 fields
        site1_contactName: '',
        site1_whatsappNumber: '',
        site1_paymentNumber: '',
        site1_rate: '',

        // Site 2 fields
        site2_contactName: '',
        site2_whatsappNumber: '',
        site2_paymentNumber: '',
        site2_rate: '',

        // Legacy fields for backward compatibility
        contactName: '',
        whatsappNumber: ''
    });

    // Load configuration when component mounts or showConfig changes
    useEffect(() => {
        if (showConfig) {
            loadSiteConfig();
        }
    }, [showConfig]);

    // Updated loadSiteConfig function
    const loadSiteConfig = async () => {
        try {
            const config = await getSettings();
            if (config) {
                setSiteConfig({
                    // Site 1 fields
                    site1_contactName: config.site1_contactName || config.contactName || '',
                    site1_whatsappNumber: config.site1_whatsappNumber || config.whatsappNumber || '',
                    site1_paymentNumber: config.site1_paymentNumber || '',
                    site1_rate: config.site1_rate || '',

                    // Site 2 fields
                    site2_contactName: config.site2_contactName || '',
                    site2_whatsappNumber: config.site2_whatsappNumber || '',
                    site2_paymentNumber: config.site2_paymentNumber || '',
                    site2_rate: config.site2_rate || '',

                    // Legacy fields
                    contactName: config.contactName || '',
                    whatsappNumber: config.whatsappNumber || ''
                });
            }
        } catch (error) {
            console.error('Failed to load site config:', error);
        }
    };

    const handleConfigSave = async () => {
        setConfigLoading(true);
        try {
            // Add fixed site names to the config before saving
            const configToSave = {
                ...siteConfig,
                site1_name: 'B1 SATTA',
                site2_name: 'B1 SATTA PLAY',
            };

            await updateSettings(configToSave);
            alert('Site configuration saved successfully!');
            setShowConfig(false);
            // Call optional callback to refresh data in parent component
            if (onConfigSaved) {
                onConfigSaved();
            }
        } catch (error) {
            console.error('Failed to save config:', error);
            alert('Failed to save configuration. Please try again.');
        } finally {
            setConfigLoading(false);
        }
    };

    if (!showConfig) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-white text-xl mb-6">Multi-Site Configuration</h3>

                {/* Site 1 Configuration */}
                <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
                    <h4 className="text-white text-lg mb-4 flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                        B1 SATTA Configuration
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                value={siteConfig.site1_contactName || ''}
                                onChange={(e) => setSiteConfig({ ...siteConfig, site1_contactName: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                placeholder="Enter name"
                                disabled={configLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                WhatsApp Number
                            </label>
                            <input
                                type="number"
                                value={siteConfig.site1_whatsappNumber || ''}
                                onChange={(e) => setSiteConfig({ ...siteConfig, site1_whatsappNumber: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                placeholder="919999999999"
                                disabled={configLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Payment Number
                            </label>
                            <input
                                type="text"
                                value={siteConfig.site1_paymentNumber || ''}
                                onChange={(e) => setSiteConfig({ ...siteConfig, site1_paymentNumber: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                placeholder="UPI/Phone number for payments"
                                disabled={configLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Rate (₹)
                            </label>
                            <input
                                type="number"
                                value={siteConfig.site1_rate || ''}
                                onChange={(e) => setSiteConfig({ ...siteConfig, site1_rate: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                placeholder="e.g., 90"
                                disabled={configLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* Site 2 Configuration */}
                <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
                    <h4 className="text-white text-lg mb-4 flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                        B1 SATTA PLAY Configuration
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                value={siteConfig.site2_contactName || ''}
                                onChange={(e) => setSiteConfig({ ...siteConfig, site2_contactName: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                                placeholder="Enter name"
                                disabled={configLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                WhatsApp Number
                            </label>
                            <input
                                type="number"
                                value={siteConfig.site2_whatsappNumber || ''}
                                onChange={(e) => setSiteConfig({ ...siteConfig, site2_whatsappNumber: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                                placeholder="919999999999"
                                disabled={configLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Payment Number
                            </label>
                            <input
                                type="text"
                                value={siteConfig.site2_paymentNumber || ''}
                                onChange={(e) => setSiteConfig({ ...siteConfig, site2_paymentNumber: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                                placeholder="UPI/Phone number for payments"
                                disabled={configLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Rate (₹)
                            </label>
                            <input
                                type="number"
                                value={siteConfig.site2_rate || ''}
                                onChange={(e) => setSiteConfig({ ...siteConfig, site2_rate: e.target.value })}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                                placeholder="e.g., 90"
                                disabled={configLoading}
                            />
                        </div>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t border-white/20">
                    <button
                        onClick={handleConfigSave}
                        disabled={configLoading}
                        className="flex-1 bg-gradientmidyellow text-white py-3 px-4 rounded-lg roboto hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {configLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Saving...
                            </div>
                        ) : (
                            'Save All Configurations'
                        )}
                    </button>
                    <button
                        onClick={() => setShowConfig(false)}
                        disabled={configLoading}
                        className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SiteConfig;