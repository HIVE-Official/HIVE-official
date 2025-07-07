"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import {
  ArrowLeft,
  Search,
  Users,
  MessageSquare,
  GraduationCap,
  MapPin,
  CheckCircle,
} from "lucide-react";

interface University {
  id: string;
  name: string;
  domain: string;
  location: string;
  memberCount: number;
  spaceCount: number;
  isVerified: boolean;
  logo?: string;
}

// SUNY Schools whitelist - UB-only launch for vBETA
const SUNY_UNIVERSITIES: University[] = [
  {
    id: "suny-buffalo",
    name: "University at Buffalo (SUNY)",
    domain: "buffalo.edu",
    location: "Buffalo, NY",
    memberCount: 0, // Will be populated as we launch
    spaceCount: 0,
    isVerified: true,
  },
];

export default function CampusSelectionPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState<
    University[]
  >([]);
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUniversities(SUNY_UNIVERSITIES); // Show all SUNY schools
    } else {
      const filtered = SUNY_UNIVERSITIES.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.domain.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUniversities(filtered);
    }
  }, [searchQuery]);

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
  };

  const handleContinue = () => {
    if (!selectedUniversity) return;

    setIsLoading(true);

    // Navigate to login with university context
    const params = new URLSearchParams({
      schoolId: selectedUniversity.id,
      schoolName: selectedUniversity.name,
      domain: selectedUniversity.domain,
    });

    router.push(`/auth/login?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-zinc-400 hover:text-white mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to your campus&apos;s HIVE
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-3xl">
              Connect with students, discover events, and shape your college experience like never before.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Verify you're a UB student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 text-lg py-3 font-sans"
            autoFocus
          />
        </div>

        {/* vBETA Launch Info */}
        <Card className="mb-8 bg-accent/5 border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <GraduationCap className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-accent mb-2 font-display">
                  UB vBETA Launch
                </h3>
                <p className="text-muted text-sm leading-relaxed font-sans">
                  HIVE is launching exclusively at University at Buffalo first.
                  Sign in with your official @buffalo.edu email address to join
                  the founding UB community on HIVE.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* University Results */}
        <div className="space-y-4 mb-8">
          {filteredUniversities.length === 0 && searchQuery ? (
            <Card className="bg-surface-01 border-border">
              <CardContent className="pt-6 text-center">
                <p className="text-muted mb-4 font-sans">
                  Please use your @buffalo.edu email to access HIVE
                </p>
                <p className="text-sm text-muted font-sans">
                  HIVE is currently exclusive to University at Buffalo students.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredUniversities.map((university) => (
              <Card
                key={university.id}
                className={`cursor-pointer transition-all duration-base ease-hive-smooth ${
                  selectedUniversity?.id === university.id
                    ? "bg-accent/10 border-accent/50"
                    : "bg-surface-01 border-border hover:bg-surface-02"
                }`}
                onClick={() => handleUniversitySelect(university)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold font-display">
                          {university.name}
                        </h3>
                        {university.isVerified && (
                          <CheckCircle className="w-5 h-5 text-accent" />
                        )}
                        {selectedUniversity?.id === university.id && (
                          <Badge variant="default" className="bg-accent text-background font-medium">
                            Selected
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted mb-3 font-sans">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{university.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-mono">
                            @{university.domain}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm font-sans">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted" />
                          <span className="text-muted">
                            {university.memberCount > 0
                              ? `${university.memberCount.toLocaleString()} students`
                              : "Launching soon"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-muted" />
                          <span className="text-muted">
                            {university.spaceCount > 0
                              ? `${university.spaceCount} active spaces`
                              : "Getting ready"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Selected University Preview */}
        {selectedUniversity && (
          <Card className="mb-8 bg-surface-01 border-border">
            <CardHeader>
              <CardTitle className="text-accent font-display">
                Ready to Join {selectedUniversity.name}?
              </CardTitle>
              <CardDescription className="font-sans">
                You&apos;ll need to verify your identity with your @
                {selectedUniversity.domain} email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-02 rounded-lg">
                  <div>
                    <div className="font-medium font-display">UB Community</div>
                    <div className="text-muted font-sans">
                      You&apos;re part of the early community that&apos;s defining how students 
                      connect on campus.
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-accent" />
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-02 rounded-lg">
                  <div>
                    <div className="font-medium font-display">
                      Campus Spaces
                    </div>
                    <div className="text-muted font-sans">
                      We&apos;re building the tools that will transform how you experience college.
                    </div>
                  </div>
                  <MessageSquare className="w-8 h-8 text-accent" />
                </div>

                <Button
                  onClick={handleContinue}
                  className="w-full bg-foreground hover:bg-foreground/90 text-background font-semibold py-3 font-display"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Loading..."
                    : `Continue with ${selectedUniversity.name}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="bg-surface-01 border-border">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 font-display">Need Help?</h3>
            <div className="space-y-3 text-sm text-muted font-sans">
              <div>
                <strong className="text-foreground">Not a UB student?</strong>
                <p>
                  HIVE is currently launching exclusively at University at
                  Buffalo. We&apos;ll be expanding to other universities soon!
                </p>
              </div>
              <div>
                <strong className="text-foreground">
                  Don&apos;t have a @buffalo.edu email?
                </strong>
                <p>
                  HIVE requires official university email addresses for
                  verification. Contact UB IT services for access to your
                  student email.
                </p>
              </div>
              <div>
                <strong className="text-foreground">
                  Questions about the UB launch?
                </strong>
                <p>
                  We&apos;re building HIVE specifically for UB students first. Join
                  our founding community and help shape the platform!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
