'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    category: '',
    source: '',
    companyName: '',
    employees: '',
    website: '',
    socials: {
      tiktok: '',
      instagram: '',
      youtube: '',
      twitter: ''
    },
    promoCode: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const updateSocial = (network: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [network]: value }
    }));
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.source) newErrors.source = 'This field is required';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.employees) newErrors.employees = 'Company size is required';

    // Check at least one social link
    const hasSocial = Object.values(formData.socials).some(v => v.trim() !== '');
    if (!hasSocial) {
      newErrors.socials = 'Add at least one social link';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, submit to API
    console.log('Final Data:', formData);
    // Redirect or show success
    router.push('/dashboard?onboarded=true');
  };

  const progress = step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;

  // Step 4 States for Chat
  const [chatStep, setChatStep] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user', text: string }>>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [brandProfileProgress, setBrandProfileProgress] = useState(0);
  const [profileStatuses, setProfileStatuses] = useState({
    brand: 'Not Started',
    audience: 'Not Started',
    voice: 'Not Started',
    setsApart: 'Not Started'
  });

  // Init chat on step 4
  if (step === 4 && chatMessages.length === 0) {
    setChatMessages([
      { sender: 'ai', text: `I can see your team is ${formData.companyName || 'erecr'} with the website ${formData.website || 'rerfre.com'}. Is this the correct business you'd like to set up your brand profile for?` }
    ]);
  }

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;
    const userInput = currentInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    setCurrentInput('');

    setTimeout(() => {
      if (chatStep === 0) {
        setChatMessages(prev => [...prev, 
          { sender: 'ai', text: `Searching: ${formData.website || 'rerfre.com'}...` },
          { sender: 'ai', text: `I wasn't able to pull up much info from ${formData.website || 'rerfre.com'} — looks like it might not be indexed yet. No worries! Can you give me a quick rundown of what ${formData.companyName || 'erecr'} is and what you do?` }
        ]);
        setChatStep(1);
        setProfileStatuses(prev => ({ ...prev, brand: 'In Progress' }));
        setBrandProfileProgress(10);
      } else if (chatStep === 1) {
        setChatMessages(prev => [...prev, 
          { sender: 'ai', text: `Nice! So it's a coding interview prep or learning platform.` },
          { sender: 'ai', text: `Who's your typical user — like, are we talking bootcamp grads, self-taught devs, CS students? Who are you trying to reach?` }
        ]);
        setChatStep(2);
        setProfileStatuses(prev => ({ ...prev, brand: 'Completed', audience: 'In Progress' }));
        setBrandProfileProgress(35);
      } else if (chatStep === 2) {
        setChatMessages(prev => [...prev, 
          { sender: 'ai', text: `Got it — ${userInput} trying to break into the industry!` },
          { sender: 'ai', text: `How would you describe the vibe of your brand? Are you more motivational and hype-y, calm and educational, or something else?` }
        ]);
        setChatStep(3);
        setProfileStatuses(prev => ({ ...prev, audience: 'Completed', voice: 'In Progress' }));
        setBrandProfileProgress(60);
      } else if (chatStep === 3) {
        setChatMessages(prev => [...prev, 
          { sender: 'ai', text: `Cool, ${userInput} — like a knowledgeable friend guiding you through it, not a hype machine.` },
          { sender: 'ai', text: `What makes ${formData.companyName || 'erecr'} different from something like LeetCode or freeCodeCamp? What's your edge?` }
        ]);
        setChatStep(4);
        setProfileStatuses(prev => ({ ...prev, voice: 'Completed', setsApart: 'In Progress' }));
        setBrandProfileProgress(85);
      } else if (chatStep === 4) {
        setChatMessages(prev => [...prev, 
          { sender: 'ai', text: `That's a great edge! I have everything I need to get started with your Brand Profile.` }
        ]);
        setChatStep(5);
        setProfileStatuses(prev => ({ ...prev, setsApart: 'Completed' }));
        setBrandProfileProgress(100);
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-html)] text-[var(--text-primary)] font-sans relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Mesh Background (similar to layout) */}
      <div className="mesh-gradient" />
      <div className="bg-grid" />

      <div className="w-full max-w-4xl z-10">
        {/* Progress Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-[var(--text-secondary)] mb-2">
            Step {step} of 4
          </p>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-1">
            <div 
              className="h-full bg-gradient-to-r from-[var(--color-accent-400)] to-[var(--color-accent-500)] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)]">{progress}% complete</p>
        </div>

        {/* Step Content */}
        <div className="panel p-8 backdrop-blur-xl bg-black/30 border border-white/5 rounded-3xl shadow-2xl">
          {step === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-display tracking-tight mb-2">Welcome to Sigmora</h1>
                <p className="text-[var(--text-secondary)]">The Ultimate Social Media Marketing Tool</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureCard 
                  icon={<RemixIcon />}
                  title="Content Remixer"
                  description="Remix any viral content from an URL or from our database and adapt it to your specific product and niche with AI-powered scriptwriting."
                />
                <FeatureCard 
                  icon={<CoachIcon />}
                  title="Content Coach"
                  description="Get expert feedback on every video before you publish. Our AI coach reviews your content and tells you if it's ready to post."
                />
                <FeatureCard 
                  icon={<DbIcon />}
                  title="Viral Content Database"
                  description="We scroll social media so you don't have to—discover proven formats from high-performing marketing content."
                />
                <FeatureCard 
                  icon={<SpyIcon />}
                  title="Competitor Account Spy"
                  description="Spy on any Instagram or TikTok account and gather data on which videos are popping off. Analyze performance metrics."
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button onClick={handleNext} className="button px-8">Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold font-display">Team Basics</h2>
                <p className="text-[var(--text-secondary)]">Create Your Profile</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputWrapper label="First Name *" error={errors.firstName}>
                  <input 
                    type="text" 
                    placeholder="e.g., John" 
                    value={formData.firstName}
                    onChange={e => updateField('firstName', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)]"
                  />
                </InputWrapper>
                <InputWrapper label="Last Name *" error={errors.lastName}>
                  <input 
                    type="text" 
                    placeholder="e.g., Doe" 
                    value={formData.lastName}
                    onChange={e => updateField('lastName', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)]"
                  />
                </InputWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputWrapper label="I am a... *" error={errors.category}>
                  <select 
                    value={formData.category}
                    onChange={e => updateField('category', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)] [&>option]:bg-[#121418]"
                  >
                    <option value="" disabled>Select your category</option>
                    <option value="Creator / Influencer">Creator / Influencer</option>
                    <option value="Agency owner">Agency owner</option>
                    <option value="Ecom / Brand owner">Ecom / Brand owner</option>
                    <option value="Coaching/Services Business">Coaching/Services Business</option>
                  </select>
                </InputWrapper>
                <InputWrapper label="How did you hear about us? *" error={errors.source}>
                  <select 
                    value={formData.source}
                    onChange={e => updateField('source', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)] [&>option]:bg-[#121418]"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="TikTok / Shorts / Reels">TikTok / Shorts / Reels</option>
                    <option value="YouTube Longform">YouTube Longform</option>
                    <option value="Twitter / X">Twitter / X</option>
                    <option value="Friend/Word of Mouth">Friend/Word of Mouth</option>
                  </select>
                </InputWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputWrapper label="Company Name *" error={errors.companyName}>
                  <input 
                    type="text" 
                    placeholder="e.g., Acme Corporation" 
                    value={formData.companyName}
                    onChange={e => updateField('companyName', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)]"
                  />
                </InputWrapper>
                <InputWrapper label="Number of Employees *" error={errors.employees}>
                  <select 
                    value={formData.employees}
                    onChange={e => updateField('employees', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)] [&>option]:bg-[#121418]"
                  >
                    <option value="" disabled>Select company size</option>
                    <option value="Just Me">Just Me</option>
                    <option value="2-10 employees">2-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51+ employees">51+ employees</option>
                  </select>
                </InputWrapper>
              </div>

              <InputWrapper label="Company Website">
                <input 
                  type="text" 
                  placeholder="https://www.example.com" 
                  value={formData.website}
                  onChange={e => updateField('website', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)]"
                />
              </InputWrapper>

              <div>
                <p className="text-sm font-semibold mb-1">Add at least one social link *</p>
                <p className="text-xs text-[var(--text-muted)] mb-3">URL or @handle — handles will auto-convert to links</p>
                {errors.socials && <p className="text-xs text-red-400 mb-3">{errors.socials}</p>}
                
                <div className="space-y-3">
                  <span className="text-xs font-semibold block text-[var(--text-secondary)]">TikTok</span>
                  <input 
                    type="text" 
                    placeholder="@user or url" 
                    value={formData.socials.tiktok}
                    onChange={e => updateSocial('tiktok', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)]"
                  />
                  <span className="text-xs font-semibold block text-[var(--text-secondary)]">Instagram</span>
                  <input 
                    type="text" 
                    placeholder="@user or url" 
                    value={formData.socials.instagram}
                    onChange={e => updateSocial('instagram', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)]"
                  />
                  <span className="text-xs font-semibold block text-[var(--text-secondary)]">YouTube</span>
                  <input 
                    type="text" 
                    placeholder="@channel or url" 
                    value={formData.socials.youtube}
                    onChange={e => updateSocial('youtube', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)]"
                  />
                  <span className="text-xs font-semibold block text-[var(--text-secondary)]">Twitter / X</span>
                  <input 
                    type="text" 
                    placeholder="@user or url" 
                    value={formData.socials.twitter}
                    onChange={e => updateSocial('twitter', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button onClick={handleBack} className="button-secondary px-6">Previous</button>
                <button onClick={handleNext} className="button px-8">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold font-display">Review</h2>
                <p className="text-[var(--text-secondary)]">Everything look good?</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h3 className="text-xs uppercase font-bold text-[var(--text-muted)] mb-3">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-[var(--text-secondary)]">First Name:</p>
                    <p>{formData.firstName}</p>
                    <p className="text-[var(--text-secondary)]">Last Name:</p>
                    <p>{formData.lastName}</p>
                    <p className="text-[var(--text-secondary)]">Category:</p>
                    <p>{formData.category}</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h3 className="text-xs uppercase font-bold text-[var(--text-muted)] mb-3">Team Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-[var(--text-secondary)]">Company Name:</p>
                    <p>{formData.companyName}</p>
                    <p className="text-[var(--text-secondary)]">Company Size:</p>
                    <p>{formData.employees}</p>
                    <p className="text-[var(--text-secondary)]">Website:</p>
                    <p>{formData.website || '-'}</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <h3 className="text-xs uppercase font-bold text-[var(--text-muted)] mb-3">Social Media</h3>
                  <div className="space-y-1 text-sm">
                    {Object.entries(formData.socials).map(([key, value]) => value && (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize text-[var(--text-secondary)]">{key}:</span>
                        <span className="text-[var(--color-accent-400)]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-[var(--text-muted)] block mb-2">Promo Code</label>
                  <p className="text-xs text-[var(--text-muted)] mb-2">Have a promo code? Enter it below for bonus credits.</p>
                  <input 
                    type="text" 
                    placeholder="Enter promo code (optional)" 
                    value={formData.promoCode}
                    onChange={e => updateField('promoCode', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[var(--color-accent-400)]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button onClick={handleBack} className="button-secondary px-6">Previous</button>
                <button onClick={handleNext} className="button px-8">Confirm</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold font-display">Brand Setup</h2>
                <p className="text-[var(--text-secondary)] text-sm">Let's dial in your brand · ~3 min</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Chat Panel */}
                <div className="md:col-span-2 flex flex-col h-[400px] bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                  {/* Chat Top Bar */}
                  <div className="p-3 border-bottom border-white/5 flex justify-between items-center bg-white/3">
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">AI Strategy Assistant</span>
                    <button onClick={handleSubmit} className="text-xs text-[var(--text-muted)] hover:text-white">Skip for now</button>
                  </div>

                  {/* Message List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
                    {chatMessages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.sender === 'ai' 
                            ? 'bg-white/5 border border-white/5 self-start' 
                            : 'bg-[var(--color-accent-500)]/90 text-white self-end'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  {/* Input bar */}
                  <div className="p-3 border-top border-white/5 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type your answer..." 
                      value={currentInput}
                      onChange={e => setCurrentInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-accent-400)]"
                    />
                    <button onClick={handleSendMessage} className="button px-4 py-2 text-sm !rounded-xl">Send</button>
                  </div>
                </div>

                {/* Status Dashboard */}
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-bold">Your Brand Profile</h3>
                      <span className="text-xs font-semibold bg-[var(--color-accent-500)]/20 text-[var(--color-accent-400)] px-2 py-1 rounded">{brandProfileProgress}%</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-3">What we're building</p>
                    <ul className="space-y-2">
                      <BrandProfileItem label="Your Brand" status={profileStatuses.brand} />
                      <BrandProfileItem label="Your Audience" status={profileStatuses.audience} />
                      <BrandProfileItem label="Your Voice" status={profileStatuses.voice} />
                      <BrandProfileItem label="What Sets You Apart" status={profileStatuses.setsApart} />
                    </ul>
                  </div>

                  <div className="bg-white/4 rounded-2xl p-4 border border-white/5">
                    <h4 className="text-xs uppercase font-bold text-[var(--text-muted)] mb-1">Why this matters</h4>
                    <p className="text-[10px] text-[var(--text-secondary)] leading-tight">
                      To produce specific recommendations for our Content Remixer so you don't re-type context.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button onClick={handleBack} className="button-secondary px-6">Previous</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--color-accent-400)] transition-all duration-300 transform hover:-translate-y-1">
      <div className="mb-3 text-[var(--color-accent-400)]">{icon}</div>
      <h3 className="text-base font-bold mb-1">{title}</h3>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </div>
  );
}

function InputWrapper({ label, error, children }: { label: string, error?: string, children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold block mb-1 text-[var(--text-secondary)]">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function BrandProfileItem({ label, status }: { label: string, status: string }) {
  return (
    <li className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/5">
      <span className="text-xs font-semibold">{label}</span>
      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{status}</span>
    </li>
  );
}

// Icons (SVGs)
function RemixIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2 4-4"/><path d="m13 19-2 2-4-4"/><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="15" x2="15" y1="3" y2="21"/></svg>
  );
}

function CoachIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );
}

function DbIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
  );
}

function SpyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><circle cx="11" cy="11" r="3"/></svg>
  );
}
