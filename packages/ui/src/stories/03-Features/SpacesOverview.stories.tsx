import type { Meta, StoryObj } from '@storybook/react';
import { SpaceCard } from '../../components/spaces/space-card';
import { SpaceCardPreview } from '../../components/spaces/space-card-preview';
import { Badge } from '../../components/badge';
import { 
  Users, 
  Star, 
  GraduationCap, 
  Sparkles,
  Building 
} from 'lucide-react';

// Create a component wrapper for the story
const SpacesOverview = () => (
  <div className="p-6 space-y-8">
    <h2 className="text-2xl font-semibold">Spaces Overview</h2>
    <p className="text-muted-foreground">Complete overview of HIVE space ecosystem</p>
  </div>
);

const meta: Meta<typeof SpacesOverview> = {
  component: SpacesOverview,
  title: '03-Features/Spaces Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete overview of all space types and categories in the HIVE ecosystem.',
      },
    },
  },
};

export default meta;

const spaceTypeConfig = {
  academic: {
    label: 'Academic',
    icon: GraduationCap,
    color: 'chip' as const,
    description: 'Academic departments and university programs'
  },
  residential: {
    label: 'Residential',
    icon: Users,
    color: 'chip' as const,
    description: 'Dorms, residential halls, and housing communities'
  },
  organization: {
    label: 'Student Orgs',
    icon: Users,
    color: 'chip' as const,
    description: 'Student-led clubs, societies, and groups (including HIVE Lab)'
  },
  greek: {
    label: 'Greek Life',
    icon: Star,
    color: 'accent' as const,
    description: 'Greek organizations and professional fraternities'
  },
  interest: {
    label: 'Campus Innovation',
    icon: Sparkles,
    color: 'accent' as const,
    description: 'HIVE Lab and campus innovation spaces'
  },
};

export const AllSpacesByCategory: StoryObj = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            HIVE Spaces Ecosystem
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Complete overview of active and preview mode spaces across all campus categories.
          </p>
        </div>

        {/* Academic Spaces */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-surface-02 border border-border rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">
                Academic
              </h2>
              <p className="text-sm text-muted">Academic departments and university programs</p>
            </div>
            <Badge variant="chip" className="ml-auto">3</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpaceCard
              id="cs-dept"
              name="Computer Science Department"
              description="Official CS department space for announcements, resources, and academic discussions."
              type="academic"
              status="active"
              memberCount={1247}
              upcomingEvents={5}
              recentActivity="Discussion about data structures assignment"
              leaders={[{ id: '1', name: 'Prof Smith' }]}
              onJoin={() => console.log('Join CS Dept')}
              onViewSpace={() => console.log('View CS Dept')}
            />
            <SpaceCard
              id="engineering-school"
              name="School of Engineering"
              description="Connect with fellow engineering students across all disciplines."
              type="academic"
              status="active"
              memberCount={2856}
              upcomingEvents={8}
              leaders={[{ id: '1', name: 'Dean Johnson' }]}
              onJoin={() => console.log('Join Engineering')}
              onViewSpace={() => console.log('View Engineering')}
            />
            <SpaceCardPreview
              id="math-dept-preview"
              name="Mathematics Department"
              description="Connect with math students, get help with problem sets, and discuss advanced topics."
              type="academic"
              category="Academic"
              potentialMembers={892}
              anticipatedEvents={5}
              keywords={['calculus', 'linear algebra', 'study groups']}
              onRequestActivation={() => console.log('Request Math Dept')}
              onLearnMore={() => console.log('Learn more Math')}
            />
          </div>
        </section>

        {/* Student Organizations */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-surface-02 border border-border rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">
                Student Organizations
              </h2>
              <p className="text-sm text-muted">Student-led clubs, societies, and groups (including HIVE Lab)</p>
            </div>
            <Badge variant="chip" className="ml-auto">5</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpaceCard
              id="gaming-society"
              name="Gaming Society"
              description="For gamers by gamers. Weekly tournaments, LAN parties, and gaming discussions."
              type="organization"
              status="active"
              memberCount={324}
              upcomingEvents={7}
              recentActivity="Smash Bros tournament this Friday!"
              leaders={[{ id: '1', name: 'Alex Chen' }]}
              onJoin={() => console.log('Join Gaming')}
              onViewSpace={() => console.log('View Gaming')}
            />
            <SpaceCard
              id="hive-lab"
              name="HIVE Lab"
              description="Build custom tools for your spaces. Learn programming and create solutions that spread across campus."
              type="organization"
              status="active"
              memberCount={42}
              upcomingEvents={3}
              recentActivity="New tool: Study Group Scheduler"
              leaders={[{ id: '1', name: 'HIVE Team' }]}
              onJoin={() => console.log('Join HIVE Lab')}
              onViewSpace={() => console.log('View HIVE Lab')}
            />
            <SpaceCard
              id="debate-club"
              name="Debate Club"
              description="Sharpen your argumentative skills and engage in intellectual discourse."
              type="organization"
              status="active"
              memberCount={78}
              upcomingEvents={2}
              leaders={[{ id: '1', name: 'Sarah Wilson' }]}
              onJoin={() => console.log('Join Debate')}
              onViewSpace={() => console.log('View Debate')}
            />
            <SpaceCardPreview
              id="robotics-club-preview"
              name="Robotics Club"
              description="Build robots, compete in competitions, and learn about automation and AI."
              type="organization"
              category="Student Organizations"
              potentialMembers={156}
              anticipatedEvents={8}
              keywords={['arduino', 'programming', 'competitions', 'engineering']}
              onRequestActivation={() => console.log('Request Robotics')}
              onLearnMore={() => console.log('Learn more Robotics')}
            />
            <SpaceCardPreview
              id="photography-club-preview"
              name="Photography Club"
              description="Capture campus life, learn new techniques, and share your artistic vision."
              type="organization"
              category="Student Organizations"
              potentialMembers={234}
              anticipatedEvents={3}
              keywords={['digital', 'portfolio', 'workshops', 'darkroom']}
              onRequestActivation={() => console.log('Request Photography')}
              onLearnMore={() => console.log('Learn more Photography')}
            />
          </div>
        </section>

        {/* Residential Spaces */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-surface-02 border border-border rounded-lg flex items-center justify-center">
              <Building className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">
                Residential
              </h2>
              <p className="text-sm text-muted">Dorms, residential halls, and housing communities</p>
            </div>
            <Badge variant="chip" className="ml-auto">3</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpaceCard
              id="north-campus"
              name="North Campus Residents"
              description="Connect with your neighbors, organize events, and build community."
              type="residential"
              status="active"
              memberCount={892}
              upcomingEvents={3}
              recentActivity="Pizza night planning for Friday"
              leaders={[{ id: '1', name: 'RA Mike' }]}
              onJoin={() => console.log('Join North Campus')}
              onViewSpace={() => console.log('View North Campus')}
            />
            <SpaceCard
              id="ellicott-complex"
              name="Ellicott Complex"
              description="The heart of freshman life at UB. Share resources and make friends."
              type="residential"
              status="active"
              memberCount={1156}
              upcomingEvents={5}
              recentActivity="Study rooms available tonight"
              leaders={[{ id: '1', name: 'RA Jenny' }]}
              onJoin={() => console.log('Join Ellicott')}
              onViewSpace={() => console.log('View Ellicott')}
            />
            <SpaceCardPreview
              id="south-campus-preview"
              name="South Campus Community"
              description="Connect graduate students and upperclassmen living in South Campus."
              type="residential"
              category="Residential"
              potentialMembers={567}
              anticipatedEvents={4}
              keywords={['graduate', 'upperclassmen', 'quiet study']}
              onRequestActivation={() => console.log('Request South Campus')}
              onLearnMore={() => console.log('Learn more South Campus')}
            />
          </div>
        </section>

        {/* Greek Life */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-surface-02 border border-border rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">
                Greek Life
              </h2>
              <p className="text-sm text-muted">Greek organizations and professional fraternities</p>
            </div>
            <Badge variant="secondary" className="ml-auto">2</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpaceCard
              id="alpha-phi-alpha"
              name="Alpha Phi Alpha"
              description="Brotherhood, scholarship, and service since 1906."
              type="greek"
              status="invite_only"
              memberCount={45}
              upcomingEvents={2}
              leaders={[{ id: '1', name: 'Brother James' }]}
              onRequestAccess={() => console.log('Request APA access')}
              onViewSpace={() => console.log('View APA')}
            />
            <SpaceCardPreview
              id="gamma-phi-beta-preview"
              name="Gamma Phi Beta"
              description="Building strong, confident women through sisterhood and philanthropy."
              type="greek"
              category="Greek Life"
              potentialMembers={89}
              anticipatedEvents={6}
              keywords={['sisterhood', 'philanthropy', 'leadership']}
              onRequestActivation={() => console.log('Request GPB')}
              onLearnMore={() => console.log('Learn more GPB')}
            />
          </div>
        </section>

        {/* Campus Innovation */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-surface-02 border border-border rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">
                Campus Innovation
              </h2>
              <p className="text-sm text-muted">HIVE Lab and campus innovation spaces</p>
            </div>
            <Badge variant="secondary" className="ml-auto">2</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpaceCard
              id="campus-builders"
              name="Campus Builders"
              description="For students building the future of campus life through technology and innovation."
              type="interest"
              status="active"
              memberCount={23}
              upcomingEvents={4}
              recentActivity="New hackathon project: Smart Dining"
              leaders={[{ id: '1', name: 'HIVE Team' }]}
              onJoin={() => console.log('Join Builders')}
              onViewSpace={() => console.log('View Builders')}
            />
            <SpaceCardPreview
              id="tool-creators-preview"
              name="Tool Creators Network"
              description="Connect with students who build custom tools and solutions for campus problems."
              type="interest"
              category="Campus Innovation"
              potentialMembers={67}
              anticipatedEvents={4}
              keywords={['programming', 'innovation', 'entrepreneurship', 'campus solutions']}
              onRequestActivation={() => console.log('Request Tool Creators')}
              onLearnMore={() => console.log('Learn more Tool Creators')}
            />
          </div>
        </section>
      </div>
    </div>
  ),
};

export const CompactGrid: StoryObj = {
  render: () => (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
        All Spaces - Compact View
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {/* Academic */}
        <SpaceCard
          id="cs-dept"
          name="Computer Science"
          description="Official CS department space for announcements and discussions."
          type="academic"
          status="active"
          memberCount={1247}
          upcomingEvents={5}
          onJoin={() => {}}
          onViewSpace={() => {}}
        />
        <SpaceCardPreview
          id="math-dept"
          name="Mathematics Dept"
          description="Connect with math students and get help with problem sets."
          type="academic"
          category="Academic"
          potentialMembers={892}
          anticipatedEvents={5}
          keywords={['calculus', 'algebra']}
          onRequestActivation={() => {}}
          onLearnMore={() => {}}
        />
        
        {/* Student Orgs */}
        <SpaceCard
          id="gaming"
          name="Gaming Society"
          description="Weekly tournaments, LAN parties, and gaming discussions."
          type="organization"
          status="active"
          memberCount={324}
          upcomingEvents={7}
          onJoin={() => {}}
          onViewSpace={() => {}}
        />
        <SpaceCard
          id="hive-lab"
          name="HIVE Lab"
          description="Build custom tools for campus spaces."
          type="organization"
          status="active"
          memberCount={42}
          upcomingEvents={3}
          onJoin={() => {}}
          onViewSpace={() => {}}
        />
        <SpaceCardPreview
          id="robotics"
          name="Robotics Club"
          description="Build robots and compete in competitions."
          type="organization"
          category="Student Orgs"
          potentialMembers={156}
          anticipatedEvents={8}
          keywords={['arduino', 'programming']}
          onRequestActivation={() => {}}
          onLearnMore={() => {}}
        />
        
        {/* Residential */}
        <SpaceCard
          id="north-campus"
          name="North Campus"
          description="Connect with your neighbors and organize events."
          type="residential"
          status="active"
          memberCount={892}
          upcomingEvents={3}
          onJoin={() => {}}
          onViewSpace={() => {}}
        />
        <SpaceCardPreview
          id="south-campus"
          name="South Campus"
          description="Graduate students and upperclassmen community."
          type="residential"
          category="Residential"
          potentialMembers={567}
          anticipatedEvents={4}
          keywords={['graduate', 'upperclassmen']}
          onRequestActivation={() => {}}
          onLearnMore={() => {}}
        />
        
        {/* Greek */}
        <SpaceCard
          id="apa"
          name="Alpha Phi Alpha"
          description="Brotherhood, scholarship, and service since 1906."
          type="greek"
          status="invite_only"
          memberCount={45}
          upcomingEvents={2}
          onRequestAccess={() => {}}
          onViewSpace={() => {}}
        />
        <SpaceCardPreview
          id="gpb"
          name="Gamma Phi Beta"
          description="Strong women through sisterhood and philanthropy."
          type="greek"
          category="Greek Life"
          potentialMembers={89}
          anticipatedEvents={6}
          keywords={['sisterhood', 'philanthropy']}
          onRequestActivation={() => {}}
          onLearnMore={() => {}}
        />
        
        {/* Innovation */}
        <SpaceCard
          id="builders"
          name="Campus Builders"
          description="Building the future of campus life through technology."
          type="interest"
          status="active"
          memberCount={23}
          upcomingEvents={4}
          onJoin={() => {}}
          onViewSpace={() => {}}
        />
      </div>
    </div>
  ),
};