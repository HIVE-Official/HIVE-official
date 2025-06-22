"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@hive/ui";
import { Input } from "@hive/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import { Badge } from "@hive/ui";
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
    <div className="min-h-screen bg-[#0A0A0A] text-white">
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
            <h1 className="text-3xl font-bold font-display">
              Welcome to HIVE at UB
            </h1>
            <p className="text-zinc-400 mt-1 font-sans">
              The exclusive social platform launching at University at Buffalo
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
        <Card className="mb-8 bg-[#FFD700]/5 border-[#FFD700]/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <GraduationCap className="w-6 h-6 text-[#FFD700] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#FFD700] mb-2 font-display">
                  UB vBETA Launch
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
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
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="pt-6 text-center">
                <p className="text-zinc-400 mb-4 font-sans">
                  Please use your @buffalo.edu email to access HIVE
                </p>
                <p className="text-sm text-zinc-500 font-sans">
                  HIVE is currently exclusive to University at Buffalo students.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredUniversities.map((university) => (
              <Card
                key={university.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedUniversity?.id === university.id
                    ? "bg-[#FFD700]/10 border-[#FFD700]/50"
                    : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70"
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
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {selectedUniversity?.id === university.id && (
                          <Badge className="bg-[#FFD700] text-black font-medium">
                            Selected
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-zinc-400 mb-3 font-sans">
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
                          <Users className="w-4 h-4 text-zinc-500" />
                          <span className="text-zinc-400">
                            {university.memberCount > 0
                              ? `${university.memberCount.toLocaleString()} students`
                              : "Launching soon"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-zinc-500" />
                          <span className="text-zinc-400">
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
          <Card className="mb-8 bg-zinc-900/30 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-[#FFD700] font-display">
                Ready to Join {selectedUniversity.name}?
              </CardTitle>
              <CardDescription className="font-sans">
                You'll need to verify your identity with your @
                {selectedUniversity.domain} email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <div className="font-medium font-display">UB Community</div>
                    <div className="text-sm text-zinc-400 font-sans">
                      Join the founding UB students on HIVE
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-[#FFD700]" />
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <div className="font-medium font-display">
                      Campus Spaces
                    </div>
                    <div className="text-sm text-zinc-400 font-sans">
                      Connect with UB students in your programs and interests
                    </div>
                  </div>
                  <MessageSquare className="w-8 h-8 text-[#FFD700]" />
                </div>

                <Button
                  onClick={handleContinue}
                  className="w-full bg-[#FFD700] hover:bg-[#FFE255] text-black font-semibold py-3 font-display"
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
        <Card className="bg-zinc-900/30 border-zinc-800">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 font-display">Need Help?</h3>
            <div className="space-y-3 text-sm text-zinc-400 font-sans">
              <div>
                <strong className="text-white">Not a UB student?</strong>
                <p>
                  HIVE is currently launching exclusively at University at
                  Buffalo. We'll be expanding to other universities soon!
                </p>
              </div>
              <div>
                <strong className="text-white">
                  Don't have a @buffalo.edu email?
                </strong>
                <p>
                  HIVE requires official university email addresses for
                  verification. Contact UB IT services for access to your
                  student email.
                </p>
              </div>
              <div>
                <strong className="text-white">
                  Questions about the UB launch?
                </strong>
                <p>
                  We're building HIVE specifically for UB students first. Join
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
