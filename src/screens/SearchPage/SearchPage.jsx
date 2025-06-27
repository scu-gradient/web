import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Building, Calendar, ExternalLink, Mail, Briefcase, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { db } from '../../firebase';
import { collection, query, getDocs, where, limit as fbLimit } from "firebase/firestore";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);
    const [totalProfiles, setTotalProfiles] = useState(0);

    // Replace with your actual API endpoint
    const API_ENDPOINT = 'https://similarity-search-ygzppckila-uc.a.run.app/';

    // Function to transform API response to frontend format
    const transformApiResponse = (apiData) => {
        // Handle both single profile and array of profiles
        const profiles = Array.isArray(apiData) ? apiData : [apiData];

        return profiles.map((profile, index) => {
            // Extract experiences from the flat structure
            const experiences = [];

            // Extract experience 1
            if (profile.experience_1_title || profile.experience_1_company) {
                experiences.push({
                    title: profile.experience_1_title || 'Position',
                    company: profile.experience_1_company || 'Company',
                    duration: profile.experience_1_duration || '',
                    description: profile.experience_1_description || ''
                });
            }

            // Extract experience 2
            if (profile.experience_2_title || profile.experience_2_company) {
                experiences.push({
                    title: profile.experience_2_title || 'Position',
                    company: profile.experience_2_company || 'Company',
                    duration: profile.experience_2_duration || '',
                    description: profile.experience_2_description || ''
                });
            }

            // Extract experience 3
            if (profile.experience_3_title || profile.experience_3_company) {
                experiences.push({
                    title: profile.experience_3_title || 'Position',
                    company: profile.experience_3_company || 'Company',
                    duration: profile.experience_3_duration || '',
                    description: profile.experience_3_description || ''
                });
            }

            // Add current role as first experience if different
            if (profile.current_role_title || profile.current_role_company) {
                const currentRole = {
                    title: profile.current_role_title || 'Position',
                    company: profile.current_role_company || 'Company',
                    duration: profile.current_role_duration || '',
                    description: profile.current_role_description || ''
                };

                // Check if current role is different from existing experiences
                const isDuplicate = experiences.some(exp =>
                    exp.title === currentRole.title && exp.company === currentRole.company
                );

                if (!isDuplicate) {
                    experiences.unshift(currentRole);
                }
            }

            // Build education string
            let education = '';
            if (profile.highest_education_degree || profile.highest_education_school) {
                education = `${profile.highest_education_degree || ''} at ${profile.highest_education_school || ''}`.trim();
                if (profile.highest_education_year) {
                    education += ` (${profile.highest_education_year})`;
                }
                if (profile.highest_education_field) {
                    education += ` - ${profile.highest_education_field}`;
                }
            }

            return {
                id: profile.id || `profile_${index}`,
                name: profile.full_name || profile.name || 'Unknown',
                initials: getInitials(profile.full_name || profile.name || 'Unknown'),
                match: Math.round((Math.sqrt(1 - Math.pow((profile.similarity || 0) - 1, 2))) * 100),
                location: profile.location || 'Location not specified',
                title: profile.headline || profile.current_role_title || profile.title || 'Title not specified',
                education: education,
                color: profile.color || getRandomColor(index),
                linkedin_url: profile.linkedin_url || profile.metadata?.linkedin_url,
                fullProfile: {
                    about: profile.about || profile.fullProfile?.about || '',
                    experiences: experiences
                },
                // Keep original data for debugging
                _originalData: profile
            };
        });
    };

    // Function to search profiles via your API
    const searchProfiles = async (query, limit = 20) => {
        try {
            setIsSearching(true);
            setError(null);

            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    limit: limit
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            console.log('Raw API response:', data);

            // Transform the API response to match frontend format
            let transformedResults = [];

            if (data.results && Array.isArray(data.results)) {
                // API returns { results: [...] } format
                transformedResults = transformApiResponse(data.results);
            } else if (Array.isArray(data)) {
                // API returns array directly
                transformedResults = transformApiResponse(data);
            } else if (data.id || data.full_name) {
                // API returns single profile object
                transformedResults = transformApiResponse([data]);
            } else {
                console.warn('Unexpected API response format:', data);
                transformedResults = [];
            }

            setSearchResults(transformedResults);
            setTotalProfiles(data.total_profiles || data.count || transformedResults.length);

        } catch (err) {
            console.error('Search error:', err);
            setError(err.message);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Backup Firestore search function (for fallback or testing)
    const searchProfilesFromFirestore = async (queryText, limitCount = 20) => {
        try {
            setIsSearching(true);
            setError(null);

            const profilesRef = collection(db, 'profiles');
            const q = query(profilesRef, fbLimit(limitCount));
            const querySnapshot = await getDocs(q);

            const results = querySnapshot.docs.map((doc, index) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name || 'Unknown',
                    initials: getInitials(data.name || 'Unknown'),
                    match: 100,
                    location: data.location || 'Location not specified',
                    title: data.title || 'Title not specified',
                    education: data.education || '',
                    color: getRandomColor(index),
                    fullProfile: {
                        about: data.about || '',
                        experiences: data.experiences || []
                    }
                };
            });

            setSearchResults(results);
            setTotalProfiles(results.length);
        } catch (err) {
            console.error('Firestore search error:', err);
            setError(err.message);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Helper function to get initials from name
    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Helper function to get consistent colors
    const getRandomColor = (index) => {
        const colors = [
            'bg-emerald-500',
            'bg-cyan-500',
            'bg-blue-500',
            'bg-pink-500',
            'bg-indigo-500',
            'bg-purple-500',
            'bg-orange-500',
            'bg-green-500',
            'bg-red-500',
            'bg-yellow-500'
        ];
        return colors[index % colors.length];
    };

    // Handle search input changes
    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    // Retry search function
    const retrySearch = () => {
        if (searchQuery.trim()) {
            performSearch(searchQuery.trim());
        }
    };

    // Main search function that decides which method to use
    const performSearch = async (query) => {
        try {
            await searchProfiles(query);
        } catch (error) {
            console.log('API search failed, attempting to fall back to another method:', error);
            await searchProfilesFromFirestore(query);
        }
    };

    if (selectedProfile) {
        const profile = selectedProfile.fullProfile || {};
        return (
            <div className="min-h-screen bg-[#09090B] text-white">
                {/* Header with gradient background */}
                <div className="relative bg-zinc-950 border-b border-zinc-800">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div
                            className="w-full h-full"
                            style={{
                                background:
                                    "radial-gradient(circle at top, rgba(34, 211, 238, 0.1) 10%, rgba(0, 0, 0, 0) 70%)",
                            }}
                        />
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`w-16 h-16 ${selectedProfile.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                                    {selectedProfile.initials}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                                        {selectedProfile.name}
                                    </h1>
                                    <p className="text-zinc-400 flex items-center mt-1">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {selectedProfile.location}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                {selectedProfile.linkedin_url && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-zinc-950 border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                                        onClick={() => window.open(selectedProfile.linkedin_url, '_blank')}
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        LinkedIn
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedProfile(null)}
                                    className="bg-zinc-950 border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="max-w-6xl mx-auto p-6">
                    {/* About Section */}
                    {profile.about && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                                About
                            </h2>
                            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
                                <p className="text-zinc-300 leading-relaxed text-lg">{profile.about}</p>
                            </div>
                        </div>
                    )}

                    {/* Experience Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {profile.experiences?.length > 0 ? (
                                profile.experiences.map((exp, index) => (
                                    <div key={index} className="relative">
                                        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all duration-300">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-xl text-white mb-2">{exp.title}</h3>
                                                    <p className="text-transparent bg-clip-text bg-gradient-to-br from-[#22D3EE] to-[#006ADC] font-medium mb-2 flex items-center">
                                                        <Building className="w-4 h-4 mr-2 text-cyan-400" />
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                {exp.duration && (
                                                    <span className="text-sm text-zinc-400 flex items-center bg-zinc-900 px-3 py-1 rounded-full">
                                                        <Calendar className="w-4 h-4 mr-2" />
                                                        {exp.duration}
                                                    </span>
                                                )}
                                            </div>
                                            {exp.description && (
                                                <p className="text-zinc-300 leading-relaxed">{exp.description}</p>
                                            )}
                                        </div>

                                        {/* Connection line */}
                                        {index < profile.experiences.length - 1 && (
                                            <div className="w-px h-6 bg-gradient-to-b from-zinc-800 to-transparent mx-6 my-2"></div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 text-center">
                                    <p className="text-zinc-400">No experience information available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090B] text-white">
            {/* Header with gradient background */}
            <section className="relative w-full bg-[#09090B] py-16 md:py-24">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div
                        className="w-full h-full"
                        style={{
                            background:
                                "radial-gradient(circle at top, rgba(34, 211, 238, 0.15) 10%, rgba(0, 0, 0, 0) 70%)",
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 pb-3">
                                Gradient
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-[#22D3EE] to-[#006ADC] pb-3">
                                Santa Clara University
                            </span>
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="product managers in big tech"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        performSearch(searchQuery.trim());
                                    }
                                }}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-12 pr-16 py-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                            />

                            <Button
                                variant="outline"
                                size="sm"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#22D3EE] to-[#006ADC] border-0 hover:opacity-90 text-white"
                                onClick={() => {
                                    if (searchQuery.trim()) {
                                        performSearch(searchQuery.trim());
                                    }
                                }}
                            >
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Error State */}
            {error && (
                <div className="max-w-6xl mx-auto px-4 pb-8">
                    <div className="bg-red-950 border border-red-800 rounded-lg p-6 text-center">
                        <div className="text-red-400 mb-4">
                            <X className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-medium mb-2">Search Error</h3>
                            <p className="text-red-300">{error}</p>
                        </div>
                        <Button
                            onClick={retrySearch}
                            className="bg-red-800 hover:bg-red-700 text-white border-red-700"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 pb-16">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                            Select Users
                        </h2>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#22D3EE] to-[#006ADC] font-medium">
                            {searchResults.length} people found
                        </span>
                    </div>

                    <div className="grid gap-4">
                        {searchResults.map((person) => (
                            <div
                                key={person.id}
                                onClick={() => setSelectedProfile(person)}
                                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-lg p-6 cursor-pointer transition-all hover:scale-[1.01] group"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-14 h-14 ${person.color} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg`}>
                                        {person.initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-4 mb-2">
                                            <h3 className="font-bold text-xl text-white">{person.name}</h3>
                                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 text-emerald-400 border border-emerald-500/30">
                                                {person.match}% match
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-sm mb-2 flex items-center">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {person.location}
                                        </p>
                                        <p className="text-zinc-300 font-medium mb-1">{person.title}</p>
                                        {person.education && (
                                            <p className="text-zinc-400 text-sm">{person.education}</p>
                                        )}
                                    </div>
                                    <div className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!searchQuery && !isSearching && (
                <div className="text-center py-24 px-4">
                    <div className="text-zinc-500 mb-6">
                        <Search className="w-20 h-20 mx-auto mb-6 opacity-50" />
                        <h3 className="text-xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                            Start your search
                        </h3>
                        <p className="text-zinc-400">
                            Begin typing to find and connect with the right people
                        </p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {isSearching && (
                <div className="text-center py-24">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-2 border-zinc-800 border-t-cyan-500 mx-auto mb-6"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#22D3EE]/20 to-[#006ADC]/20 blur-xl"></div>
                    </div>
                    <p className="text-zinc-400 text-lg">Searching for connections...</p>
                </div>
            )}

            {/* No Results State */}
            {searchQuery && !isSearching && searchResults.length === 0 && !error && (
                <div className="text-center py-24 px-4">
                    <div className="text-zinc-500 mb-6">
                        <Search className="w-20 h-20 mx-auto mb-6 opacity-50" />
                        <h3 className="text-xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                            No results found
                        </h3>
                        <p className="text-zinc-400">
                            Try adjusting your search terms or criteria
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;