import{j as f}from"./jsx-runtime-B9GTzLod.js";import{P as J}from"./post-board-BoBKKYTp.js";import{a as e}from"./chunk-D5ZWXAHU-Dm3eDOzv.js";import"./index-BMjrbHXN.js";import"./framer-motion-proxy-Bip1EXUU.js";import"./utils-CytzSlOG.js";import"./message-circle-CnQJGxxu.js";import"./createLucideIcon-DtX30ipI.js";import"./pin-u4JsefzA.js";import"./crown-Bf-Ij_V7.js";import"./circle-check-big-fUBFJcwM.js";import"./eye-DHVClHkA.js";import"./ellipsis-D2AHQBIe.js";import"./share-2-DREqtcC9.js";import"./bookmark-B4q7zV9u.js";import"./calendar-RwBiWFlj.js";import"./clock-B-89-V79.js";import"./map-pin-J5WJcL57.js";import"./users-B5XgMSov.js";import"./v4-CtRu48qb.js";const Pe={title:"HIVE/Spaces/Molecules/PostBoard",component:J,parameters:{layout:"fullscreen",docs:{description:{component:"The PostBoard molecule handles the display and interaction of posts within a space. Supports text posts, events, polls, announcements, and tool-generated content with reactions, comments, and moderation features."}}},argTypes:{showComments:{control:{type:"boolean"}},enableInfiniteScroll:{control:{type:"boolean"}}},tags:["autodocs"]},p=[{id:"1",type:"announcement",content:"Welcome everyone to CS 101! This is our digital space for course coordination, discussions, and collaboration. Please review the syllabus and setup instructions in the pinned resources.",author:{id:"prof1",name:"Dr. Sarah Chen",role:"leader",verified:!0},timestamp:"2024-01-20T14:30:00Z",reactions:[{emoji:"👍",count:23,userReacted:!0},{emoji:"❤️",count:8,userReacted:!1},{emoji:"🎉",count:12,userReacted:!1}],commentCount:5,shareCount:3,viewCount:47,isPinned:!0,announcement:{priority:"high",isPinned:!0}},{id:"2",type:"event",content:"Lab Session: Introduction to Python basics and development environment setup. Bring your laptops and make sure you've completed the pre-lab checklist.",author:{id:"ta1",name:"Alex Rodriguez",role:"co_leader"},timestamp:"2024-01-19T16:45:00Z",reactions:[{emoji:"👍",count:15,userReacted:!1},{emoji:"📚",count:7,userReacted:!0}],commentCount:8,viewCount:31,event:{id:"lab1",title:"Lab 1: Python Setup & Basics",date:"2024-01-22T14:00:00Z",location:"Computer Lab B, 2nd Floor",rsvpCount:28,userRsvp:"yes"}},{id:"3",type:"poll",content:"What time works best for our weekly study group sessions? We want to find a time that works for the majority of the class.",author:{id:"student1",name:"Maya Patel",role:"member"},timestamp:"2024-01-19T11:20:00Z",reactions:[{emoji:"🤔",count:9,userReacted:!1},{emoji:"👍",count:6,userReacted:!1}],commentCount:12,viewCount:38,poll:{id:"poll1",question:"Best time for study group?",options:[{id:"opt1",text:"Monday 6-8 PM",votes:12,userVoted:!1},{id:"opt2",text:"Wednesday 7-9 PM",votes:18,userVoted:!0},{id:"opt3",text:"Friday 4-6 PM",votes:8,userVoted:!1},{id:"opt4",text:"Saturday 2-4 PM",votes:15,userVoted:!1}],totalVotes:53,expiresAt:"2024-01-25T23:59:59Z",allowMultiple:!1}},{id:"4",type:"text",content:"Has anyone figured out the installation issue with PyCharm on Windows 11? I keep getting an error about Python interpreter not being found even though I installed it correctly.",author:{id:"student2",name:"James Wilson",role:"member"},timestamp:"2024-01-18T20:15:00Z",reactions:[{emoji:"🆘",count:4,userReacted:!1},{emoji:"🤝",count:2,userReacted:!1}],commentCount:7,viewCount:22},{id:"5",type:"tool_output",content:"Assignment 1 has been posted with a due date of January 30th. The assignment covers variables, data types, and basic input/output operations.",author:{id:"system",name:"Assignment Tracker"},timestamp:"2024-01-18T10:00:00Z",reactions:[{emoji:"📝",count:19,userReacted:!0},{emoji:"⏰",count:11,userReacted:!1}],commentCount:3,viewCount:45,toolSource:{toolId:"assignment-tracker",toolName:"Assignment Tracker",icon:"📝"}}],m={id:"student1",role:"member"},Q={id:"prof1",role:"leader"},d={args:{posts:p,currentUser:m,onReaction:e("reaction"),onComment:e("comment"),onShare:e("share"),onEdit:e("edit"),onDelete:e("delete"),onPin:e("pin"),onReport:e("report"),onEventRsvp:e("event-rsvp"),onPollVote:e("poll-vote")}},l={args:{posts:p,currentUser:Q,onReaction:e("reaction"),onComment:e("comment"),onShare:e("share"),onEdit:e("edit"),onDelete:e("delete"),onPin:e("pin"),onReport:e("report"),onEventRsvp:e("event-rsvp"),onPollVote:e("poll-vote")},parameters:{docs:{description:{story:"PostBoard as viewed by a space leader with additional moderation capabilities like pinning and deleting posts."}}}},u={args:{posts:p.filter(a=>a.type==="event"||a.type==="announcement"),currentUser:m,onReaction:e("reaction"),onComment:e("comment"),onShare:e("share"),onEventRsvp:e("event-rsvp")},parameters:{docs:{description:{story:"PostBoard showing primarily event and announcement posts with RSVP functionality."}}}},v={args:{posts:p.filter(a=>a.type==="poll"),currentUser:m,onReaction:e("reaction"),onComment:e("comment"),onPollVote:e("poll-vote")},parameters:{docs:{description:{story:"PostBoard focusing on poll interactions with voting and results display."}}}},h={args:{posts:p.filter(a=>a.type==="tool_output"),currentUser:m,onReaction:e("reaction"),onComment:e("comment")},parameters:{docs:{description:{story:"PostBoard showing tool-generated content with proper attribution and styling."}}}},y={args:{posts:[],currentUser:m,onReaction:e("reaction"),onComment:e("comment"),onShare:e("share")},parameters:{docs:{description:{story:"Empty state when no posts exist in the space."}}}},g={args:{posts:[{...p[0],announcement:{priority:"urgent",isPinned:!0}},{id:"urgent1",type:"announcement",content:"URGENT: Class cancelled today due to weather conditions. Please check your email for updates on rescheduling.",author:{id:"prof1",name:"Dr. Sarah Chen",role:"leader",verified:!0},timestamp:"2024-01-20T08:00:00Z",reactions:[{emoji:"⚠️",count:31,userReacted:!0},{emoji:"👍",count:15,userReacted:!1}],commentCount:8,viewCount:67,isPinned:!0,announcement:{priority:"urgent",isPinned:!0}}],currentUser:m,onReaction:e("reaction"),onComment:e("comment")},parameters:{docs:{description:{story:"PostBoard with high-priority and urgent announcements showing visual priority indicators."}}}},P={render:()=>{const[a,R]=React.useState(p),[q]=React.useState(m),z=(i,n,c)=>{R(t=>t.map(o=>{if(o.id!==i)return o;const r=o.reactions||[];return r.find(s=>s.emoji===n)?{...o,reactions:r.map(s=>s.emoji===n?{...s,count:c?s.count+1:Math.max(0,s.count-1),userReacted:c}:s).filter(s=>s.count>0)}:c?{...o,reactions:[...r,{emoji:n,count:1,userReacted:!0}]}:o})),e("reaction")(i,n,c)},O=(i,n)=>{R(c=>c.map(t=>{var o;return((o=t.event)==null?void 0:o.id)===i?{...t,event:{...t.event,userRsvp:n,rsvpCount:t.event.rsvpCount?t.event.rsvpCount+1:1}}:t})),e("event-rsvp")(i,n)},K=(i,n)=>{R(c=>c.map(t=>{var o;return((o=t.poll)==null?void 0:o.id)===i?{...t,poll:{...t.poll,options:t.poll.options.map(r=>({...r,votes:r.id===n?r.votes+1:r.votes,userVoted:r.id===n})),totalVotes:t.poll.totalVotes+1}}:t})),e("poll-vote")(i,n)};return f.jsx("div",{className:"min-h-screen bg-[var(--hive-background-primary)] p-8",children:f.jsx("div",{className:"max-w-2xl mx-auto",children:f.jsx(J,{posts:a,currentUser:q,onReaction:z,onComment:e("comment"),onShare:e("share"),onEdit:e("edit"),onDelete:e("delete"),onPin:e("pin"),onReport:e("report"),onEventRsvp:O,onPollVote:K})})})},parameters:{docs:{description:{story:"Fully interactive PostBoard demo with live state updates for reactions, RSVP, and poll voting."}}}};var C,w,S;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    posts: samplePosts,
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
    onEdit: action('edit'),
    onDelete: action('delete'),
    onPin: action('pin'),
    onReport: action('report'),
    onEventRsvp: action('event-rsvp'),
    onPollVote: action('poll-vote')
  }
}`,...(S=(w=d.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var b,U,x;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    posts: samplePosts,
    currentUser: leaderUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
    onEdit: action('edit'),
    onDelete: action('delete'),
    onPin: action('pin'),
    onReport: action('report'),
    onEventRsvp: action('event-rsvp'),
    onPollVote: action('poll-vote')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard as viewed by a space leader with additional moderation capabilities like pinning and deleting posts.'
      }
    }
  }
}`,...(x=(U=l.parameters)==null?void 0:U.docs)==null?void 0:x.source}}};var E,j,V;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    posts: samplePosts.filter(post => post.type === 'event' || post.type === 'announcement'),
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share'),
    onEventRsvp: action('event-rsvp')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard showing primarily event and announcement posts with RSVP functionality.'
      }
    }
  }
}`,...(V=(j=u.parameters)==null?void 0:j.docs)==null?void 0:V.source}}};var B,T,I;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    posts: samplePosts.filter(post => post.type === 'poll'),
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onPollVote: action('poll-vote')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard focusing on poll interactions with voting and results display.'
      }
    }
  }
}`,...(I=(T=v.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var k,D,M;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    posts: samplePosts.filter(post => post.type === 'tool_output'),
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard showing tool-generated content with proper attribution and styling.'
      }
    }
  }
}`,...(M=(D=h.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var A,Z,N;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    posts: [],
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment'),
    onShare: action('share')
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no posts exist in the space.'
      }
    }
  }
}`,...(N=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:N.source}}};var F,W,_;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    posts: [{
      ...samplePosts[0],
      announcement: {
        priority: 'urgent',
        isPinned: true
      }
    }, {
      id: 'urgent1',
      type: 'announcement',
      content: 'URGENT: Class cancelled today due to weather conditions. Please check your email for updates on rescheduling.',
      author: {
        id: 'prof1',
        name: 'Dr. Sarah Chen',
        role: 'leader',
        verified: true
      },
      timestamp: '2024-01-20T08:00:00Z',
      reactions: [{
        emoji: '⚠️',
        count: 31,
        userReacted: true
      }, {
        emoji: '👍',
        count: 15,
        userReacted: false
      }],
      commentCount: 8,
      viewCount: 67,
      isPinned: true,
      announcement: {
        priority: 'urgent',
        isPinned: true
      }
    }],
    currentUser: sampleUser,
    onReaction: action('reaction'),
    onComment: action('comment')
  },
  parameters: {
    docs: {
      description: {
        story: 'PostBoard with high-priority and urgent announcements showing visual priority indicators.'
      }
    }
  }
}`,...(_=(W=g.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var L,G,H;P.parameters={...P.parameters,docs:{...(L=P.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    const [posts, setPosts] = React.useState(samplePosts);
    const [currentUser] = React.useState(sampleUser);
    const handleReaction = (postId: string, emoji: string, add: boolean) => {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id !== postId) return post;
        const reactions = post.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...post,
            reactions: reactions.map(r => r.emoji === emoji ? {
              ...r,
              count: add ? r.count + 1 : Math.max(0, r.count - 1),
              userReacted: add
            } : r).filter(r => r.count > 0)
          };
        } else if (add) {
          return {
            ...post,
            reactions: [...reactions, {
              emoji,
              count: 1,
              userReacted: true
            }]
          };
        }
        return post;
      }));
      action('reaction')(postId, emoji, add);
    };
    const handleEventRsvp = (eventId: string, response: 'yes' | 'no' | 'maybe') => {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.event?.id === eventId) {
          return {
            ...post,
            event: {
              ...post.event,
              userRsvp: response,
              rsvpCount: post.event.rsvpCount ? post.event.rsvpCount + 1 : 1
            }
          };
        }
        return post;
      }));
      action('event-rsvp')(eventId, response);
    };
    const handlePollVote = (pollId: string, optionId: string) => {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.poll?.id === pollId) {
          return {
            ...post,
            poll: {
              ...post.poll,
              options: post.poll.options.map(option => ({
                ...option,
                votes: option.id === optionId ? option.votes + 1 : option.votes,
                userVoted: option.id === optionId
              })),
              totalVotes: post.poll.totalVotes + 1
            }
          };
        }
        return post;
      }));
      action('poll-vote')(pollId, optionId);
    };
    return <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        <div className="max-w-2xl mx-auto">
          <PostBoard posts={posts} currentUser={currentUser} onReaction={handleReaction} onComment={action('comment')} onShare={action('share')} onEdit={action('edit')} onDelete={action('delete')} onPin={action('pin')} onReport={action('report')} onEventRsvp={handleEventRsvp} onPollVote={handlePollVote} />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive PostBoard demo with live state updates for reactions, RSVP, and poll voting.'
      }
    }
  }
}`,...(H=(G=P.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const Re=["Default","AsLeader","EventFocused","PollInteraction","ToolGenerated","EmptyState","HighPriorityAnnouncements","InteractiveDemo"];export{l as AsLeader,d as Default,y as EmptyState,u as EventFocused,g as HighPriorityAnnouncements,P as InteractiveDemo,v as PollInteraction,h as ToolGenerated,Re as __namedExportsOrder,Pe as default};
