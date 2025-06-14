"use client";

import { Input } from "@hive/ui/components/input";
import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { School } from "@hive/core/domain/school";
import { useRouter } from "next/navigation";

export function SchoolSearch() {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      if (schools.length > 0) return; // Fetch only once
      try {
        setLoading(true);
        const response = await fetch("/api/schools");
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const data: School[] = await response.json();
        setSchools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, [schools.length]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredSchools([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = schools.filter((school) =>
      school.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredSchools(filtered);
    setActiveIndex(-1); // Reset active index on new results
  }, [query, schools]);

  const handleSchoolSelect = (school: School) => {
    if (school.status === "active") {
      router.push(`/auth/login?schoolId=${school.id}&schoolName=${encodeURIComponent(school.name)}&domain=${encodeURIComponent(school.domain)}`);
    } else {
      router.push(`/waitlist/${school.id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < filteredSchools.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSchoolSelect(filteredSchools[activeIndex]);
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[activeIndex] as HTMLLIElement;
      activeItem?.focus();
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search for your school..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={filteredSchools.length > 0 && query.length > 0}
          aria-controls="school-results"
          aria-activedescendant={activeIndex >= 0 ? `school-item-${activeIndex}` : undefined}
        />
      </div>
      
      {loading && query && <p className="text-sm text-muted-foreground" aria-live="polite">Loading...</p>}
      {error && query && <p className="text-sm text-destructive" aria-live="assertive">{error}</p>}
      
      {query.trim() !== "" && !loading && (
        <div className="max-h-60 overflow-y-auto">
          {filteredSchools.length > 0 ? (
            <ul id="school-results" role="listbox" ref={listRef}>
              {filteredSchools.map((school, index) => (
                <li
                  key={school.id}
                  id={`school-item-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`p-2 rounded-md cursor-pointer ${
                    index === activeIndex ? "bg-muted" : "hover:bg-muted"
                  }`}
                  onClick={() => handleSchoolSelect(school)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSchoolSelect(school);
                    }
                  }}
                  tabIndex={-1} // Items are focused programmatically
                >
                  {school.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-center text-muted-foreground">
              No schools found.
            </p>
          )}
        </div>
      )}
    </div>
  );
} 