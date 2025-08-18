import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../button";
import { Card } from "../card";
import { Users, Zap, BookOpen, ArrowRight, Play, Code, TrendingUp, Heart, Sparkles, Award, Settings, ChevronRight, Rocket, Compass, GraduationCap, Building, UserCheck, Mail, Check, Badge, ChevronLeft, Home, } from "lucide-react";
// FLOW OPTION A: INSTANT ACTIVATION - Skip heavy onboarding, get users into product quickly
export const InstantActivationFlow = () => {
    const [step, setStep] = React.useState(1);
    const [email, setEmail] = React.useState("");
    const [_school, _setSchool] = React.useState("");
    const [name, setName] = React.useState("");
    const [_username, _setUsername] = React.useState("");
    if (step === 1) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-4", children: _jsx("span", { className: "font-black text-black text-2xl", children: "H" }) }), _jsx("h1", { className: "text-3xl font-bold", children: "Welcome to HIVE" }), _jsx("p", { className: "text-white/60 mt-2", children: "Join your campus community in 30 seconds" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "School Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@university.edu", className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Your Name" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Alex Johnson", className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent" })] }), _jsxs(Button, { className: "w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold py-3 text-base", onClick: () => setStep(2), children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Get Started Now"] })] }), _jsx("div", { className: "text-center", children: _jsx("button", { className: "text-white/60 hover:text-white text-sm", children: "Skip setup, explore first \u2192" }) })] }) }));
    }
    if (step === 2) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Check, { className: "w-6 h-6 text-white" }) }), _jsx("h2", { className: "text-2xl font-bold", children: "You're In!" }), _jsxs("p", { className: "text-white/60 mt-2", children: ["Magic link sent to ", email] })] }), _jsxs("div", { className: "bg-white/5 border border-white/20 rounded-lg p-6 text-center", children: [_jsx(Mail, { className: "w-8 h-8 text-[#FFD700] mx-auto mb-4" }), _jsx("p", { className: "text-sm text-white/70", children: "Click the link in your email to verify your account and you'll be redirected to your campus feed." })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { className: "w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold", children: "Open Email App" }), _jsx(Button, { variant: "outline", className: "w-full border-white/20 text-white hover:bg-white/5", children: "Resend Link" })] }), _jsx("div", { className: "text-center", children: _jsx("p", { className: "text-xs text-white/40", children: "We'll personalize your experience as you explore" }) })] }) }));
    }
    return null;
};
// FLOW OPTION B: COMMUNITY-FIRST - Lead with social proof and community discovery
export const CommunityFirstFlow = () => {
    const [step, setStep] = React.useState(1);
    const [selectedCommunities, setSelectedCommunities] = React.useState([]);
    const communities = [
        { id: 'cs', name: 'Computer Science', members: 1247, icon: Code, color: 'bg-accent' },
        { id: 'engineering', name: 'Engineering', members: 892, icon: Settings, color: 'bg-accent' },
        { id: 'business', name: 'Business', members: 734, icon: TrendingUp, color: 'bg-accent' },
        { id: 'dorm-3a', name: 'Dorm 3A', members: 156, icon: Home, color: 'bg-orange-500' },
        { id: 'study-group', name: 'Study Groups', members: 2341, icon: BookOpen, color: 'bg-accent' },
        { id: 'gaming', name: 'Gaming Club', members: 445, icon: Play, color: 'bg-accent' }
    ];
    if (step === 1) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-2xl w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6", children: _jsx("span", { className: "font-black text-black text-2xl", children: "H" }) }), _jsx("h1", { className: "text-4xl font-bold mb-4", children: "Find Your People" }), _jsxs("p", { className: "text-white/60 text-lg", children: ["Join ", _jsx("span", { className: "text-[#FFD700] font-semibold", children: "1,247" }), " students already building community"] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold text-center", children: "Active Communities Right Now" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: communities.map((community) => (_jsx(Card, { className: cn("bg-white/5 border border-white/20 p-4 cursor-pointer transition-all duration-300", selectedCommunities.includes(community.id)
                                        ? "border-[#FFD700] bg-[#FFD700]/10"
                                        : "hover:border-white/40 hover:bg-white/10"), onClick: () => {
                                        if (selectedCommunities.includes(community.id)) {
                                            setSelectedCommunities(prev => prev.filter(id => id !== community.id));
                                        }
                                        else {
                                            setSelectedCommunities(prev => [...prev, community.id]);
                                        }
                                    }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("w-10 h-10 rounded-lg flex items-center justify-center", community.color), children: _jsx(community.icon, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold", children: community.name }), _jsxs("p", { className: "text-sm text-white/60", children: [community.members, " members"] })] }), selectedCommunities.includes(community.id) && (_jsx("div", { className: "w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center", children: _jsx(Check, { className: "w-4 h-4 text-black" }) }))] }) }, community.id))) })] }), _jsxs("div", { className: "text-center", children: [_jsxs(Button, { className: "bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-8 py-3 text-base", onClick: () => setStep(2), disabled: selectedCommunities.length === 0, children: [_jsx(Users, { className: "w-4 h-4 mr-2" }), "Join ", selectedCommunities.length, " Communities"] }), _jsx("p", { className: "text-xs text-white/40 mt-2", children: "You can always discover more communities later" })] })] }) }));
    }
    if (step === 2) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Quick Setup" }), _jsx("p", { className: "text-white/60", children: "Just need your email to get you connected" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "School Email" }), _jsx("input", { type: "email", placeholder: "you@university.edu", className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent" })] }), _jsxs(Button, { className: "w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold py-3", children: [_jsx(Mail, { className: "w-4 h-4 mr-2" }), "Send Magic Link"] })] }), _jsxs("div", { className: "bg-white/5 border border-white/20 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "You're joining:" }), _jsx("div", { className: "space-y-2", children: selectedCommunities.map(id => {
                                    const community = communities.find(c => c.id === id);
                                    return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("w-6 h-6 rounded flex items-center justify-center", community?.color), children: community?.icon && _jsx(community.icon, { className: "w-3 h-3 text-white" }) }), _jsx("span", { className: "text-sm", children: community?.name })] }, id));
                                }) })] })] }) }));
    }
    return null;
};
// FLOW OPTION C: ACADEMIC-FIRST - Focus on educational context and academic credentials
export const AcademicFirstFlow = () => {
    const [step, setStep] = React.useState(1);
    const [selectedLevel, setSelectedLevel] = React.useState("");
    const [selectedYear, setSelectedYear] = React.useState("");
    const [selectedMajor, setSelectedMajor] = React.useState("");
    const academicLevels = [
        { id: 'undergraduate', name: 'Undergraduate', icon: GraduationCap, description: 'Bachelor\'s degree program' },
        { id: 'graduate', name: 'Graduate', icon: Award, description: 'Master\'s or doctoral program' },
        { id: 'faculty', name: 'Faculty', icon: BookOpen, description: 'Teaching or research staff' },
        { id: 'staff', name: 'Staff', icon: Building, description: 'Administrative or support staff' }
    ];
    const years = ['2025', '2026', '2027', '2028', '2029+'];
    const majors = ['Computer Science', 'Engineering', 'Business', 'Biology', 'Psychology', 'Art', 'English', 'Mathematics'];
    if (step === 1) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-2xl w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6", children: _jsx(GraduationCap, { className: "w-8 h-8 text-black" }) }), _jsx("h1", { className: "text-4xl font-bold mb-4", children: "Your Academic Journey" }), _jsx("p", { className: "text-white/60 text-lg", children: "Connect with your academic community at University" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: "What's your role on campus?" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: academicLevels.map((level) => (_jsx(Card, { className: cn("bg-white/5 border border-white/20 p-6 cursor-pointer transition-all duration-300", selectedLevel === level.id
                                        ? "border-[#FFD700] bg-[#FFD700]/10"
                                        : "hover:border-white/40 hover:bg-white/10"), onClick: () => setSelectedLevel(level.id), children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-[#FFD700]/20 rounded-lg flex items-center justify-center", children: _jsx(level.icon, { className: "w-6 h-6 text-[#FFD700]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: level.name }), _jsx("p", { className: "text-sm text-white/60", children: level.description })] })] }) }, level.id))) })] }), _jsx("div", { className: "text-center", children: _jsxs(Button, { className: "bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-8 py-3 text-base", onClick: () => setStep(2), disabled: !selectedLevel, children: ["Continue", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }) })] }) }));
    }
    if (step === 2) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-2xl w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Academic Details" }), _jsx("p", { className: "text-white/60", children: "Help us connect you with relevant academic communities" })] }), _jsxs("div", { className: "space-y-6", children: [selectedLevel === 'undergraduate' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Graduation Year" }), _jsx("div", { className: "flex gap-2", children: years.map(year => (_jsx("button", { onClick: () => setSelectedYear(year), className: cn("px-4 py-2 rounded-lg border transition-colors", selectedYear === year
                                                ? "bg-[#FFD700] text-black border-[#FFD700]"
                                                : "bg-white/5 border-white/20 text-white hover:border-white/40"), children: year }, year))) })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Major/Field of Study" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2", children: majors.map(major => (_jsx("button", { onClick: () => setSelectedMajor(major), className: cn("px-3 py-2 rounded-lg border text-sm transition-colors", selectedMajor === major
                                                ? "bg-[#FFD700] text-black border-[#FFD700]"
                                                : "bg-white/5 border-white/20 text-white hover:border-white/40"), children: major }, major))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "School Email" }), _jsx("input", { type: "email", placeholder: "you@university.edu", className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent" })] })] }), _jsxs("div", { className: "bg-white/5 border border-white/20 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "You'll be connected to:" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-accent rounded flex items-center justify-center", children: _jsx(Code, { className: "w-3 h-3 text-white" }) }), _jsxs("span", { className: "text-sm", children: [selectedMajor || 'Your Major', " Students"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-accent rounded flex items-center justify-center", children: _jsx(GraduationCap, { className: "w-3 h-3 text-white" }) }), _jsxs("span", { className: "text-sm", children: ["Class of ", selectedYear || 'Your Year'] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-accent rounded flex items-center justify-center", children: _jsx(BookOpen, { className: "w-3 h-3 text-white" }) }), _jsx("span", { className: "text-sm", children: "Study Groups" })] })] })] }), _jsx("div", { className: "text-center", children: _jsxs(Button, { className: "bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-8 py-3 text-base", onClick: () => setStep(3), disabled: !selectedMajor, children: [_jsx(Mail, { className: "w-4 h-4 mr-2" }), "Send Verification Email"] }) })] }) }));
    }
    return null;
};
// FLOW OPTION D: GAMIFIED - Make onboarding fun with achievements and progress
export const GamifiedFlow = () => {
    const [step, setStep] = React.useState(1);
    const [xp, setXP] = React.useState(0);
    const [achievements, setAchievements] = React.useState([]);
    const [profile, setProfile] = React.useState({
        name: '',
        email: '',
        avatar: '',
        interests: []
    });
    const addXP = (points) => {
        setXP(prev => prev + points);
    };
    const unlockAchievement = (achievement) => {
        if (!achievements.includes(achievement)) {
            setAchievements(prev => [...prev, achievement]);
        }
    };
    const interests = [
        'Gaming', 'Music', 'Sports', 'Art', 'Tech', 'Study Groups',
        'Photography', 'Coding', 'Fitness', 'Movies', 'Reading', 'Travel'
    ];
    if (step === 1) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [_jsx("div", { className: "w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center", children: _jsx(Sparkles, { className: "w-6 h-6 text-black" }) }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "text-2xl font-bold", children: "Level 1" }), _jsxs("div", { className: "text-sm text-white/60", children: [xp, " XP"] })] })] }), _jsx("h1", { className: "text-3xl font-bold mb-2", children: "Welcome to HIVE" }), _jsx("p", { className: "text-white/60", children: "Complete your profile to unlock campus features" })] }), _jsx("div", { className: "bg-white/10 rounded-full h-2", children: _jsx("div", { className: "bg-[#FFD700] h-2 rounded-full transition-all duration-300", style: { width: `${Math.min((xp / 100) * 100, 100)}%` } }) }), _jsxs("div", { className: "bg-white/5 border border-white/20 rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-accent rounded-full flex items-center justify-center", children: _jsx(UserCheck, { className: "w-4 h-4 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "First Quest: Your Identity" }), _jsx("p", { className: "text-sm text-white/60", children: "+25 XP" })] })] }), _jsx(Badge, { className: "bg-[#FFD700] text-black", children: "Active" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Your Name" }), _jsx("input", { type: "text", value: profile.name, onChange: (e) => setProfile(prev => ({ ...prev, name: e.target.value })), placeholder: "Enter your name", className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent" })] }), _jsxs(Button, { className: "w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold", onClick: () => {
                                            addXP(25);
                                            unlockAchievement('first-quest');
                                            setStep(2);
                                        }, disabled: !profile.name, children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Complete Quest (+25 XP)"] })] })] }), achievements.length > 0 && (_jsx("div", { className: "bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Award, { className: "w-5 h-5 text-[#FFD700]" }), _jsx("span", { className: "text-sm font-semibold text-[#FFD700]", children: "Achievement Unlocked!" })] }) }))] }) }));
    }
    if (step === 2) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [_jsx("div", { className: "w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center", children: _jsx(Sparkles, { className: "w-6 h-6 text-black" }) }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "text-2xl font-bold", children: "Level 1" }), _jsxs("div", { className: "text-sm text-white/60", children: [xp, " XP"] })] })] }), _jsxs("h2", { className: "text-2xl font-bold mb-2", children: ["Great job, ", profile.name, "!"] }), _jsx("p", { className: "text-white/60", children: "Next quest: Connect your campus identity" })] }), _jsx("div", { className: "bg-white/10 rounded-full h-2", children: _jsx("div", { className: "bg-[#FFD700] h-2 rounded-full transition-all duration-300", style: { width: `${Math.min((xp / 100) * 100, 100)}%` } }) }), _jsxs("div", { className: "bg-white/5 border border-white/20 rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-accent rounded-full flex items-center justify-center", children: _jsx(Mail, { className: "w-4 h-4 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Campus Connection" }), _jsx("p", { className: "text-sm text-white/60", children: "+30 XP" })] })] }), _jsx(Badge, { className: "bg-[#FFD700] text-black", children: "Active" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "School Email" }), _jsx("input", { type: "email", value: profile.email, onChange: (e) => setProfile(prev => ({ ...prev, email: e.target.value })), placeholder: "you@university.edu", className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent" })] }), _jsxs(Button, { className: "w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold", onClick: () => {
                                            addXP(30);
                                            unlockAchievement('campus-connected');
                                            setStep(3);
                                        }, disabled: !profile.email, children: [_jsx(Rocket, { className: "w-4 h-4 mr-2" }), "Send Magic Link (+30 XP)"] })] })] }), _jsx("div", { className: "bg-white/5 border border-white/20 rounded-lg p-4 opacity-60", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-accent rounded-full flex items-center justify-center", children: _jsx(Heart, { className: "w-3 h-3 text-white" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-sm", children: "Bonus Quest: Find Your Tribe" }), _jsx("p", { className: "text-xs text-white/60", children: "+50 XP \u2022 Select your interests" })] })] }) })] }) }));
    }
    if (step === 3) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [_jsx("div", { className: "w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center", children: _jsx(Award, { className: "w-6 h-6 text-black" }) }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "text-2xl font-bold", children: "Level 2" }), _jsxs("div", { className: "text-sm text-white/60", children: [xp, " XP"] })] })] }), _jsx("h2", { className: "text-2xl font-bold mb-2", children: "Level Up!" }), _jsx("p", { className: "text-white/60", children: "Final quest: Discover your community" })] }), _jsx("div", { className: "bg-white/10 rounded-full h-2", children: _jsx("div", { className: "bg-[#FFD700] h-2 rounded-full transition-all duration-300", style: { width: `${Math.min((xp / 150) * 100, 100)}%` } }) }), _jsxs("div", { className: "bg-white/5 border border-white/20 rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-accent rounded-full flex items-center justify-center", children: _jsx(Heart, { className: "w-4 h-4 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Find Your Tribe" }), _jsx("p", { className: "text-sm text-white/60", children: "+50 XP \u2022 Select 3+ interests" })] })] }), _jsx(Badge, { className: "bg-[#FFD700] text-black", children: "Bonus" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "grid grid-cols-2 gap-2", children: interests.map(interest => (_jsx("button", { onClick: () => {
                                                if (profile.interests.includes(interest)) {
                                                    setProfile(prev => ({
                                                        ...prev,
                                                        interests: prev.interests.filter(i => i !== interest)
                                                    }));
                                                }
                                                else {
                                                    setProfile(prev => ({
                                                        ...prev,
                                                        interests: [...prev.interests, interest]
                                                    }));
                                                }
                                            }, className: cn("px-3 py-2 rounded-lg border text-sm transition-all", profile.interests.includes(interest)
                                                ? "bg-[#FFD700] text-black border-[#FFD700] scale-105"
                                                : "bg-white/5 border-white/20 text-white hover:border-white/40"), children: interest }, interest))) }), _jsxs(Button, { className: "w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold", onClick: () => {
                                            addXP(50);
                                            unlockAchievement('tribe-finder');
                                            setStep(4);
                                        }, disabled: profile.interests.length < 3, children: [_jsx(Compass, { className: "w-4 h-4 mr-2" }), "Complete Adventure (+50 XP)"] }), _jsxs("p", { className: "text-xs text-white/40 text-center", children: ["Selected: ", profile.interests.length, "/3 minimum"] })] })] })] }) }));
    }
    if (step === 4) {
        return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(Award, { className: "w-10 h-10 text-black" }) }), _jsx("h1", { className: "text-3xl font-bold mb-2", children: "Adventure Complete!" }), _jsx("p", { className: "text-white/60", children: "You've unlocked your campus community" })] }), _jsx("div", { className: "bg-white/5 border border-white/20 rounded-lg p-6", children: _jsxs("div", { className: "grid grid-cols-2 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[#FFD700]", children: xp }), _jsx("div", { className: "text-sm text-white/60", children: "XP Earned" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-[#FFD700]", children: achievements.length }), _jsx("div", { className: "text-sm text-white/60", children: "Achievements" })] })] }) }), _jsxs("div", { className: "bg-white/5 border border-white/20 rounded-lg p-6", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Unlocked Communities:" }), _jsx("div", { className: "space-y-2", children: profile.interests.slice(0, 3).map(interest => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center", children: _jsx(Check, { className: "w-3 h-3 text-black" }) }), _jsxs("span", { className: "text-sm", children: [interest, " Community"] })] }, interest))) })] }), _jsxs(Button, { className: "w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold py-3 text-base", onClick: () => {
                            // Navigate to main app
                        }, children: [_jsx(Rocket, { className: "w-4 h-4 mr-2" }), "Enter Campus"] })] }) }));
    }
    return null;
};
// FLOW OPTION E: PROGRESSIVE WIZARD - Traditional step-by-step with clear progress
export const ProgressiveWizardFlow = () => {
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
        school: '',
        email: '',
        name: '',
        role: '',
        year: '',
        major: '',
        interests: []
    });
    const totalSteps = 5;
    const progressPercent = (step / totalSteps) * 100;
    const schools = [
        'Stanford University',
        'MIT',
        'Harvard University',
        'UC Berkeley',
        'Carnegie Mellon',
        'Other'
    ];
    const roles = [
        { id: 'student', name: 'Student', description: 'Undergraduate or graduate student' },
        { id: 'faculty', name: 'Faculty', description: 'Professor or instructor' },
        { id: 'staff', name: 'Staff', description: 'Administrative or support staff' },
        { id: 'alumni', name: 'Alumni', description: 'Graduate or former student' }
    ];
    const renderStep = () => {
        switch (step) {
            case 1:
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Welcome to HIVE" }), _jsx("p", { className: "text-white/60", children: "Let's get you connected to your campus community" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-3", children: "Select your school" }), _jsx("div", { className: "space-y-2", children: schools.map(school => (_jsx("button", { onClick: () => setFormData(prev => ({ ...prev, school })), className: cn("w-full px-4 py-3 rounded-lg border text-left transition-colors", formData.school === school
                                            ? "bg-[#FFD700] text-black border-[#FFD700]"
                                            : "bg-white/5 border-white/20 text-white hover:border-white/40"), children: school }, school))) })] })] }));
            case 2:
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Your Campus Role" }), _jsx("p", { className: "text-white/60", children: "This helps us connect you with the right communities" })] }), _jsx("div", { className: "space-y-3", children: roles.map(role => (_jsx(Card, { className: cn("p-4 cursor-pointer transition-all", formData.role === role.id
                                    ? "bg-[#FFD700]/10 border-[#FFD700]"
                                    : "bg-white/5 border-white/20 hover:border-white/40"), onClick: () => setFormData(prev => ({ ...prev, role: role.id })), children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-[#FFD700]/20 rounded-lg flex items-center justify-center", children: _jsx(UserCheck, { className: "w-5 h-5 text-[#FFD700]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: role.name }), _jsx("p", { className: "text-sm text-white/60", children: role.description })] })] }) }, role.id))) })] }));
            case 3:
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Account Setup" }), _jsx("p", { className: "text-white/60", children: "We'll send you a magic link to get started" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Your Name" }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData(prev => ({ ...prev, name: e.target.value })), placeholder: "Enter your full name", className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "School Email" }), _jsx("input", { type: "email", value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })), placeholder: "you@university.edu", className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent" })] })] })] }));
            case 4:
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Academic Information" }), _jsx("p", { className: "text-white/60", children: "Help us connect you with relevant communities" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Graduation Year" }), _jsxs("select", { value: formData.year, onChange: (e) => setFormData(prev => ({ ...prev, year: e.target.value })), className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent", children: [_jsx("option", { value: "", children: "Select year" }), _jsx("option", { value: "2025", children: "2025" }), _jsx("option", { value: "2026", children: "2026" }), _jsx("option", { value: "2027", children: "2027" }), _jsx("option", { value: "2028", children: "2028" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Major/Field" }), _jsx("input", { type: "text", value: formData.major, onChange: (e) => setFormData(prev => ({ ...prev, major: e.target.value })), placeholder: "e.g., Computer Science", className: "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent" })] })] })] }));
            case 5:
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Setup Complete!" }), _jsxs("p", { className: "text-white/60", children: ["Magic link sent to ", formData.email] })] }), _jsxs("div", { className: "bg-white/5 border border-white/20 rounded-lg p-6 text-center", children: [_jsx(Mail, { className: "w-12 h-12 text-[#FFD700] mx-auto mb-4" }), _jsx("h3", { className: "font-semibold mb-2", children: "Check your email" }), _jsx("p", { className: "text-sm text-white/60", children: "Click the magic link in your email to verify your account and complete setup." })] }), _jsxs("div", { className: "bg-white/5 border border-white/20 rounded-lg p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "You'll be connected to:" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4 text-[#FFD700]" }), _jsx("span", { children: formData.school })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4 text-[#FFD700]" }), _jsxs("span", { children: [formData.major, " Students"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4 text-[#FFD700]" }), _jsxs("span", { children: ["Class of ", formData.year] })] })] })] })] }));
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-4", children: _jsx("span", { className: "font-black text-black", children: "H" }) }), _jsxs("div", { className: "text-sm text-white/60 mb-2", children: ["Step ", step, " of ", totalSteps] }), _jsx("div", { className: "w-full bg-white/10 rounded-full h-2 mb-4", children: _jsx("div", { className: "bg-[#FFD700] h-2 rounded-full transition-all duration-300", style: { width: `${progressPercent}%` } }) })] }), _jsx("div", { className: "mb-8", children: renderStep() }), _jsxs("div", { className: "flex gap-3", children: [step > 1 && (_jsxs(Button, { variant: "outline", onClick: () => setStep(step - 1), className: "border-white/20 text-white hover:bg-white/5", children: [_jsx(ChevronLeft, { className: "w-4 h-4 mr-2" }), "Back"] })), step < totalSteps && (_jsxs(Button, { className: "flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold", onClick: () => setStep(step + 1), disabled: (step === 1 && !formData.school) ||
                                (step === 2 && !formData.role) ||
                                (step === 3 && (!formData.name || !formData.email)) ||
                                (step === 4 && (!formData.year || !formData.major)), children: [step === 3 ? 'Send Magic Link' : 'Continue', _jsx(ChevronRight, { className: "w-4 h-4 ml-2" })] })), step === totalSteps && (_jsxs(Button, { className: "flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold", onClick: () => {
                                // Navigate to main app
                            }, children: [_jsx(Rocket, { className: "w-4 h-4 mr-2" }), "Enter HIVE"] }))] })] }) }));
};
//# sourceMappingURL=flow-alternatives.js.map