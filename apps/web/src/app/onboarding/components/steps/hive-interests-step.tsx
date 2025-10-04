import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Tag, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Button } from "@hive/ui";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveInterestsStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

// Interest categories with authentic student voice from HIVE_INTERESTS.md
const INTEREST_CATEGORIES = [
  {
    id: 'academic',
    title: 'Academic (The Grind)',
    icon: '📚',
    interests: [
      'CS major (actually cool unlike at other schools)', 'Pre-med stress case', 'Engineering survivor',
      'Business school networking', 'Liberal arts defender', 'Math prodigy', 'Biology lab slave',
      'Chemistry explosion risk', 'Physics confusion', 'Psychology mind reader', 'Communications (yes it\'s real)',
      'Art major (parents disappointed)', 'Music theory nerd', 'Philosophy arguer', 'Political science debater',
      'Economics graph maker', 'History fact dropper', 'Foreign language struggles', 'Study abroad flexer',
      'Research grunt', 'Honors program tryhard', 'Dean\'s list or bust', 'Academic probation comeback',
      'Double major masochist', 'Minor collector', 'Thesis writer', 'Lab report procrastinator',
      'Office hours regular', 'Professor\'s favorite (sorry)', 'TA survivor', 'Plagiarism checker beater'
    ]
  },
  {
    id: 'social',
    title: 'Social (IRL Connections)',
    icon: '🎉',
    interests: [
      'Party legend', 'Social coordinator', 'Introvert by choice', 'Greek life recruit',
      'Club president (resume padding)', 'Event planning stress', 'GroupMe admin hell', 'Wing person duties',
      'DD sacrifice', 'Photo documentation specialist', 'IG story curator', 'Professional networker',
      'Small talk assassin', 'Networking ninja', 'Social butterfly', 'Community builder',
      'Friend group glue', 'Social media manager', 'Event photographer', 'Group chat moderator',
      'Icebreaker champion', 'Conversation starter', 'People connector', 'Friendship matchmaker'
    ]
  },
  {
    id: 'tech',
    title: 'Tech & Digital',
    icon: '💻',
    interests: [
      'Coding bootcamp dropout', 'GitHub green squares addict', 'Stack Overflow copy-paster',
      'Hackathon warrior', 'Open source contributor', 'Bug fix hero', 'Code review nitpicker',
      'Terminal aesthetic lover', 'Vim vs Emacs fighter', 'Programming language snob',
      'Tech startup dreamer', 'AI prompt engineer', 'Cryptocurrency hodler', 'NFT skeptic',
      'Web3 explorer', 'Blockchain believer', 'Digital nomad wannabe', 'Tech news junkie',
      'Gadget reviewer', 'Software beta tester', 'Hardware tinkerer', 'Tech support guru',
      'Digital minimalist', 'Privacy advocate', 'Cybersecurity paranoid', 'Data hoarder'
    ]
  },
  {
    id: 'food',
    title: 'Food & Survival',
    icon: '🍕',
    interests: [
      'Ramen connoisseur', 'Meal prep Sunday warrior', 'Dining hall regular', 'Food truck hunter',
      'Coffee addict (obviously)', 'Energy drink dependent', 'Midnight snack specialist', 'Grocery budget master',
      'Cooking disaster creator', 'Microwave meal expert', 'Pizza ordering champion', 'Buffet destroyer',
      'Vegan converter', 'Keto experimenter', 'Intermittent faster', 'Cheat day planner',
      'Restaurant reviewer', 'Food Instagram influencer', 'Recipe collector', 'Kitchen disaster survivor',
      'Campus dining critic', 'Local restaurant explorer', 'Food delivery app abuser', 'Snack hoarder'
    ]
  },
  {
    id: 'campus',
    title: 'Campus Life (UB Specific)',
    icon: '🏫',
    interests: [
      'Knox Hall survivor', 'Ellicott community member', 'Governors resident', 'South Campus defender',
      'North Campus explorer', 'Student Union regular', 'Library hermit', 'Dining hall connoisseur',
      'Campus tour guide', 'Orientation leader', 'Student government participant', 'Club fair enthusiast',
      'Homecoming participant', 'Spring Fest attendee', 'Fall Fest volunteer', 'Campus traditions keeper',
      'UB pride ambassador', 'Blue and white bleeder', 'Campus historian', 'Tradition creator',
      'School spirit champion', 'Campus event organizer', 'Student life enthusiast', 'Bulls supporter'
    ]
  },
  {
    id: 'buffalo',
    title: 'Buffalo Culture',
    icon: '🏙️',
    interests: [
      'Bills Mafia member', 'Sabres fan (dedication)', 'Wings expert (not mild)', 'Beef on weck lover',
      'Elmwood Village explorer', 'Canalside regular', 'Allentown resident', 'Chippewa survivor',
      'Anchor Bar pilgrim', 'Duff\'s loyalist', 'Mighty Taco defender', 'Loganberry drinker',
      'Snow day champion', 'Lake effect veteran', 'Buffalo weather survivor', 'City of Good Neighbors',
      'Rust Belt pride', 'Western NY representative', 'Buffalo revival witness', 'Local business supporter',
      'Buffalo music scene follower', 'Kleinhans regular', 'Shea\'s attendee', 'Local brewery hopper'
    ]
  },
  {
    id: 'entertainment',
    title: 'Entertainment & Media',
    icon: '🎬',
    interests: [
      'Netflix binge champion', 'Disney+ nostalgic', 'HBO prestige watcher', 'Reality TV guilty pleasure',
      'Podcast addict', 'Audiobook listener', 'True crime obsessed', 'Documentary explorer',
      'Stand-up comedy fan', 'Movie theater loyalist', 'Film critic wannabe', 'Oscar predictor',
      'Music festival attendee', 'Concert photographer', 'Vinyl collector', 'Playlist curator',
      'Spotify wrapped flexer', 'Live music lover', 'Underground scene supporter', 'Music snob',
      'Broadway musical enthusiast', 'Theater kid (reformed)', 'Arts supporter', 'Cultural critic'
    ]
  },
  {
    id: 'gaming',
    title: 'Gaming & Esports',
    icon: '🎮',
    interests: [
      'Console warrior', 'PC master race', 'Mobile gaming casual', 'Retro gaming collector',
      'Speedrun watcher', 'Twitch streamer', 'Discord moderator', 'Gaming clan member',
      'Tournament competitor', 'Casual gaming defender', 'Indie game supporter', 'AAA game critic',
      'Gaming news follower', 'Hardware upgrader', 'RGB lighting enthusiast', 'Mechanical keyboard snob',
      'Gaming chair investor', 'Headset audiophile', 'Controller collector', 'Gaming setup optimizer',
      'Leaderboard climber', 'Achievement hunter', 'Completionist', 'Gaming backlog manager'
    ]
  },
  {
    id: 'wellness',
    title: 'Health & Wellness',
    icon: '💪',
    interests: [
      'Gym membership forgetter', 'Yoga class dropper', 'Running app liar', 'Fitness tracker slave',
      'Mental health advocate', 'Therapy supporter', 'Meditation app user', 'Mindfulness practitioner',
      'Sleep schedule destroyer', 'Caffeine dependent', 'Vitamin supplement believer', 'Self-care Sunday follower',
      'Wellness influencer skeptic', 'Healthy eating aspirant', 'Water drinking reminder needer', 'Step counter competitive',
      'Workout buddy seeker', 'Fitness goal setter', 'Health app collector', 'Wellness trend follower',
      'Stress management learner', 'Work-life balance seeker', 'Burnout survivor', 'Recovery advocate'
    ]
  },
  {
    id: 'work',
    title: 'Work & Money',
    icon: '💰',
    interests: [
      'Internship hunter', 'Resume optimizer', 'LinkedIn lurker', 'Career fair attendee',
      'Side hustle entrepreneur', 'Freelance worker', 'Part-time job juggler', 'Study abroad saver',
      'Budget spreadsheet creator', 'Student loan accepter', 'Scholarship applicant', 'Financial aid dependent',
      'Investment app beginner', 'Crypto curious', 'Stock market watcher', 'Personal finance learner',
      'Career advisor visitor', 'Job application sender', 'Interview preparer', 'Network builder',
      'Professional development seeker', 'Skill building enthusiast', 'Future planner', 'Success definer'
    ]
  },
  {
    id: 'relationships',
    title: 'Relationships & Dating',
    icon: '💕',
    interests: [
      'Dating app survivor', 'Relationship advisor', 'Single by choice', 'Hopeless romantic',
      'Wing person extraordinaire', 'Love story believer', 'Dating coach', 'Relationship pessimist',
      'Casual dating enthusiast', 'Serious relationship seeker', 'Friendship prioritizer', 'Family connection keeper',
      'Long distance relationship maintainer', 'Communication skills learner', 'Conflict resolver', 'Love language speaker',
      'Date planner', 'Romance novel reader', 'Couples counselor believer', 'Relationship podcast listener',
      'Love advice giver', 'Heartbreak survivor', 'Self-love advocate', 'Partnership dreamer'
    ]
  },
  {
    id: 'creative',
    title: 'Creative & Artistic',
    icon: '🎨',
    interests: [
      'Digital artist', 'Traditional painter', 'Sketch book filler', 'Photography enthusiast',
      'Creative writing dreamer', 'Poetry slam attendee', 'Fanfiction writer', 'Blog creator',
      'Video editor', 'Content creator', 'Social media artist', 'Graphic design apprentice',
      'Craft project starter', 'DIY tutorial follower', 'Pinterest board organizer', 'Etsy shop dreamer',
      'Music producer wannabe', 'Instrument player', 'Singing shower performer', 'Dance floor commander',
      'Theater participant', 'Improv comedy member', 'Creative workshop attendee', 'Art gallery visitor'
    ]
  },
  {
    id: 'random',
    title: 'Random & Niche',
    icon: '🎭',
    interests: [
      'Wikipedia rabbit hole explorer', 'Fun fact collector', 'Trivia night champion', 'Quiz show watcher',
      'Board game enthusiast', 'Puzzle solver', 'Crossword completer', 'Sudoku master',
      'Book club member', 'Library visitor', 'Used bookstore browser', 'Reading challenge participant',
      'Language learning app user', 'Cultural exchange participant', 'Travel planning enthusiast', 'Adventure seeker',
      'Nature photography hobbyist', 'Hiking trail finder', 'Outdoor activity planner', 'Weather watcher',
      'Astronomy curious', 'Science experiment follower', 'Discovery channel fan', 'Learning addict'
    ]
  },
  {
    id: 'internet',
    title: 'Internet Culture & Memes',
    icon: '😂',
    interests: [
      'Meme lord status', 'TikTok algorithm victim', 'Instagram story watcher', 'Twitter thread reader',
      'Reddit karma farmer', 'Discord server moderator', 'YouTube comment section philosopher', 'Viral video predictor',
      'Internet drama follower', 'Online community builder', 'Digital culture historian', 'Social media trend setter',
      'Influencer content critic', 'Algorithm understander', 'Content creator supporter', 'Platform hopper',
      'Online friend maker', 'Virtual event attendee', 'Digital native', 'Internet culture anthropologist',
      'Meme sharing enthusiast', 'Viral content curator', 'Online trend follower', 'Digital storyteller'
    ]
  },
  {
    id: 'greek',
    title: 'Greek Life & Organizations',
    icon: '🏛️',
    interests: [
      'Greek life enthusiast', 'Sorority sister', 'Fraternity brother', 'Rush week survivor',
      'Philanthropy organizer', 'Social event planner', 'Greek week participant', 'Chapter leader',
      'Big/little relationship cherisher', 'Greek sing participant', 'Homecoming float builder', 'Community service volunteer',
      'Leadership position holder', 'Greek life advocate', 'Organization builder', 'Campus involvement enthusiast',
      'Student organization member', 'Club founder', 'Group project leader', 'Team collaboration expert',
      'Event coordination specialist', 'Student government participant', 'Campus tradition keeper', 'Community organizer'
    ]
  }
];

export function HiveInterestsStep({ data, updateData, onNext }: HiveInterestsStepProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(data.interests || []);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['academic', 'social']); // Start with first two expanded
  const [searchTerm, setSearchTerm] = useState("");

  // Update parent data when interests change
  useEffect(() => {
    updateData({ interests: selectedInterests });
  }, [selectedInterests, updateData]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else if (prev.length < 6) { // Max 6 interests
        return [...prev, interest];
      }
      return prev;
    });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter interests based on search
  const getFilteredInterests = (interests: string[]) => {
    if (!searchTerm.trim()) return interests;
    return interests.filter(interest =>
      interest.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const canContinue = selectedInterests.length >= 3 && selectedInterests.length <= 6;

  // Behavioral Psychology: Progress visualization to encourage 70% completion
  const progressPercentage = Math.min((selectedInterests.length / 6) * 100, 100);
  const isOptimalRange = selectedInterests.length >= 3 && selectedInterests.length <= 6;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-[var(--hive-spacing-6)] py-[var(--hive-spacing-4)] max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center space-y-[var(--hive-spacing-4)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-[var(--hive-brand-primary)]/30"
        >
          <Heart className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            What are you into?
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            Select 3-6 interests to help us connect you with your people.
          </p>
        </motion.div>
      </div>

      {/* Progress & Count */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-[var(--hive-spacing-4)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[var(--hive-brand-primary)]" />
              <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                {selectedInterests.length} of 3-6 selected
              </span>
            </div>
            <div className={cn(
              "text-xs px-2 py-1 rounded-full transition-colors",
              isOptimalRange
                ? "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]"
                : "bg-[var(--hive-background-tertiary)]/20 text-[var(--hive-text-muted)]"
            )}>
              {selectedInterests.length < 3 ? `${3 - selectedInterests.length} more needed`
               : selectedInterests.length === 6 ? 'Perfect!'
               : 'Looking good!'}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[var(--hive-background-tertiary)]/20 rounded-full h-2">
            <motion.div
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                isOptimalRange
                  ? "bg-[var(--hive-status-success)]"
                  : "bg-[var(--hive-brand-primary)]/50"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${(selectedInterests.length / 6) * 100}%` }}
            />
          </div>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <input
          type="text"
          placeholder="Search interests..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl bg-[var(--hive-background-secondary)]/20 border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)]/50 focus:ring-1 focus:ring-[var(--hive-brand-primary)]/20 transition-all"
        />
      </motion.div>

      {/* Interest Categories */}
      <div className="space-y-[var(--hive-spacing-4)]">
        {INTEREST_CATEGORIES.map((category, categoryIndex) => {
          const filteredInterests = getFilteredInterests(category.interests);
          const isExpanded = expandedCategories.includes(category.id);
          const hasSearchResults = searchTerm.trim() ? filteredInterests.length > 0 : true;

          if (!hasSearchResults) return null;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + categoryIndex * 0.05 }}
            >
              <Card className="overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-[var(--hive-spacing-4)] flex items-center justify-between hover:bg-[var(--hive-background-secondary)]/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{category.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-[var(--hive-text-primary)]">
                        {category.title}
                      </h3>
                      <p className="text-xs text-[var(--hive-text-muted)]">
                        {filteredInterests.length} interests
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  </motion.div>
                </button>

                {/* Interest Chips */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-[var(--hive-spacing-4)] pt-0">
                        <div className="flex flex-wrap gap-2">
                          {filteredInterests.map((interest, index) => {
                            const isSelected = selectedInterests.includes(interest);
                            const canSelect = !isSelected && selectedInterests.length < 6;

                            return (
                              <motion.button
                                key={interest}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.02 }}
                                onClick={() => toggleInterest(interest)}
                                disabled={!isSelected && selectedInterests.length >= 6}
                                className={cn(
                                  "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                                  "hover:scale-105 active:scale-95",
                                  isSelected
                                    ? "bg-[var(--hive-brand-primary)] text-black shadow-md"
                                    : canSelect
                                      ? "bg-[var(--hive-background-secondary)]/20 border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/50"
                                      : "bg-[var(--hive-background-tertiary)]/10 border border-[var(--hive-border-primary)]/10 text-[var(--hive-text-muted)] cursor-not-allowed opacity-50"
                                )}
                              >
                                {interest}
                                {isSelected && (
                                  <CheckCircle className="w-3 h-3" />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Interests Summary */}
      {selectedInterests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-[var(--hive-spacing-4)]">
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3 flex items-center">
              <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full mr-2" />
              Your Vibe
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-2 py-1 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] rounded-full text-xs font-medium"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Behavioral Encouragement */}
      {selectedInterests.length > 0 && selectedInterests.length < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm text-[var(--hive-text-muted)]">
            Add {3 - selectedInterests.length} more to help us find your perfect communities
          </p>
        </motion.div>
      )}

      {canContinue && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-4"
        >
          <Button
            variant="default"
            size="lg"
            onClick={onNext}
            className="px-8"
          >
            Continue to Final Step
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}