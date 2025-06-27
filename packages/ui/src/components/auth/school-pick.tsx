import React, { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Badge } from '../badge'
import { Input } from '../input'
import { cn } from '../../lib/utils'

export interface School {
  id: string
  name: string
  domain: string
  status: 'open' | 'waitlist'
  waitlistCount?: number
  isFeatured?: boolean
}

interface SchoolPickProps {
  schools: School[]
  onSchoolSelect: (school: School) => void
  onCreateSchool?: (schoolName: string) => void
  className?: string
}

export const SchoolPick: React.FC<SchoolPickProps> = ({
  schools,
  onSchoolSelect,
  onCreateSchool,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateSchool = () => {
    if (searchTerm.trim() && onCreateSchool) {
      onCreateSchool(searchTerm.trim())
      setIsCreating(true)
    }
  }

  const showCreateOption = searchTerm.trim() && 
    !filteredSchools.some(school => 
      school.name.toLowerCase() === searchTerm.toLowerCase()
    ) && 
    onCreateSchool

  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground p-6",
      className
    )}>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-h1 font-display font-semibold text-foreground">
            finally, your campus OS
          </h1>
          <p className="text-body font-sans text-muted max-w-md mx-auto">
            Choose your school to get started. Some schools have instant access, others are building momentum.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
          <Input
            variant="accent"
            inputSize="lg"
            type="text"
            placeholder="Search for your school..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* School List */}
        <div className="space-y-3">
          {filteredSchools.map((school) => (
            <button
              key={school.id}
              onClick={() => onSchoolSelect(school)}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left transition-all duration-base ease-smooth group",
                "hover:border-accent/50 hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10",
                "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20",
                school.isFeatured
                  ? "border-accent bg-accent/10 shadow-md shadow-accent/10"
                  : "border-border bg-surface-01"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-h4 font-display font-medium text-foreground">
                      {school.name}
                    </h3>
                    {school.isFeatured && (
                      <Badge variant="accent" size="sm">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-body-sm font-sans text-muted">
                    @{school.domain}
                  </p>
                </div>
                
                <div className="text-right">
                  {school.status === 'open' ? (
                    <div className="space-y-1">
                      <Badge variant="ritual" size="sm">
                        Open
                      </Badge>
                      <p className="text-caption font-sans text-accent font-medium">
                        Jump in
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Badge variant="outline" size="sm">
                        Waitlist
                      </Badge>
                      <p className="text-caption font-sans text-muted">
                        {school.waitlistCount || 0} left
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}

          {/* Create School Option */}
          {showCreateOption && (
            <button
              onClick={handleCreateSchool}
              disabled={isCreating}
              className={cn(
                "w-full p-4 rounded-xl border-2 border-dashed border-accent/50 text-left transition-all duration-base ease-smooth group",
                "hover:border-accent hover:bg-accent/5",
                "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20",
                isCreating && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent flex items-center justify-center">
                  <Plus className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-h4 font-display font-medium text-accent">
                    Create &ldquo;{searchTerm}&rdquo;
                  </h3>
                  <p className="text-body-sm font-sans text-muted">
                    Be the first to start your school&apos;s community
                  </p>
                </div>
              </div>
            </button>
          )}

          {/* No Results */}
          {filteredSchools.length === 0 && !showCreateOption && searchTerm && (
            <div className="text-center py-12">
                             <p className="text-body font-sans text-muted">
                 No schools found matching &ldquo;{searchTerm}&rdquo;
               </p>
            </div>
          )}
        </div>

        {/* Rally Message for Waitlist Schools */}
        <div className="bg-surface-01 border border-border rounded-xl p-6 text-center">
          <h3 className="text-h4 font-display font-medium text-foreground mb-2">
            Building the Future Together
          </h3>
          <p className="text-body-sm font-sans text-muted">
            Schools need 350 students to unlock their campus OS. 
            Join the waitlist to help bring HIVE to your community.
          </p>
        </div>
      </div>
    </div>
  )
} 