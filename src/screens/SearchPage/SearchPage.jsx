import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Building, Calendar, ExternalLink, Mail, Briefcase, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // mock profiles
    const mockProfiles = [
        {
            id: 1,
            name: "Teresa Pan",
            initials: "TP",
            match: 90,
            location: "United States",
            title: "General Manager at Northwestern Fintech Club",
            education: "Bachelor's degree at Northwestern University",
            color: "bg-emerald-500",
            fullProfile: {
                about: "Management team leader directing finances for the club by serving as the primary officer for SOFO account. Maintaining connections with corporate sponsors.",
                experiences: [
                    {
                        title: "General Manager",
                        company: "Northwestern Fintech Club",
                        duration: "Apr 2022 - Present",
                        description: "Management team leader Direct finances for the club by serving as the primary officer for our SOFO account Maintain connections with our corporate sponsors"
                    },
                    {
                        title: "Accounting Intern",
                        company: "Virtualtics",
                        duration: "Jan 2024 - Jun 2024",
                        description: ""
                    },
                    {
                        title: "Treasury Intern",
                        company: "Workiva",
                        duration: "Jun 2023 - Sep 2023",
                        description: "Responsible for analyzing cash flow, transferring funds across entities, and aiding in the quarterly intercompany settlement. Familiarized myself with how treasury operates internationally, including various transfer methods and their differences. Reported on bank fees, incorporating R (tidyverse, patchwork, scales, gtExtras) to better visualize trends"
                    },
                    {
                        title: "Financial Assistant - SOFO",
                        company: "Northwestern University",
                        duration: "Jan 2022 - Jun 2023",
                        description: "Served as a general accountant for Northwestern's 400+ active student organizations. Processed payments, reimbursements, transfer, and purchase order requests. Used MS Suite (Access, Excel, Word, Outlook) and Cougar Mountain/Denali Accounting Software. In the SY21-22, the office handled $11.5m incoming funds, $11.3m disbursed funds, and a total of 13,572 transactions"
                    }
                ]
            }
        },
        {
            id: 2,
            name: "Ayush Shukla Arora",
            initials: "AA",
            match: 89,
            location: "Evanston, Illinois",
            title: "Researcher at tilt Lab",
            education: "Bachelor's degree at Northwestern University",
            color: "bg-cyan-500"
        },
        {
            id: 3,
            name: "Fernando Gutierrez",
            initials: "FG",
            match: 89,
            location: "United States",
            title: "Economics at Northwestern University",
            education: "",
            color: "bg-blue-500"
        },
        {
            id: 4,
            name: "Mercy Muiruri",
            initials: "MM",
            match: 89,
            location: "Evanston, Illinois",
            title: "Software Developer- Formula Racing FSAE at Northwestern Formula Racing",
            education: "Bachelor of Science - BS at Northwestern University",
            color: "bg-pink-500"
        },
        {
            id: 5,
            name: "Sharon Lin",
            initials: "SL",
            match: 89,
            location: "Greater Chicago Area",
            title: "Incoming Analyst at Cornerstone Research",
            education: "Master of Science - MS at Northwestern University",
            color: "bg-indigo-500"
        }
    ];

    useEffect(() => {
        if (searchQuery.trim()) {
            setIsSearching(true);
            // Simulate API call delay
            setTimeout(() => {
                setSearchResults(mockProfiles);
                setIsSearching(false);
            }, 500);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setSelectedProfile(null);
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
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-zinc-950 border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    LinkedIn
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-zinc-950 border-zinc-800 hover:bg-zinc-900 text-zinc-300"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Contact
                                </Button>
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
                            {profile.experiences?.map((exp, index) => (
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
                                            <span className="text-sm text-zinc-400 flex items-center bg-zinc-900 px-3 py-1 rounded-full">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {exp.duration}
                                            </span>
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
                            ))}
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
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-12 pr-16 py-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#22D3EE] to-[#006ADC] border-0 hover:opacity-90 text-white"
                            >
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 pb-16">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                            Select Users
                        </h2>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#22D3EE] to-[#006ADC] font-medium">
                            {searchResults.length * 20} people
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
            {!searchQuery && (
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
        </div>
    );
};

export default SearchPage;