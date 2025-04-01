import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Trash2, Camera, ArrowLeft, Paintbrush } from 'lucide-react';
import { UserProfile, getUserProfile, updateUserProfile, generateRandomBannerColor } from '@/data/userData';

const EditChannel = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(getUserProfile());
  const [activeTab, setActiveTab] = useState('profile');
  const [bannerColor, setBannerColor] = useState(formData.bannerColor);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Reset form data when component mounts
  useEffect(() => {
    setFormData(getUserProfile());
    setBannerColor(getUserProfile().bannerColor);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., socialLinks.website)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof UserProfile] as Record<string, unknown>),
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSwitchChange = (name: keyof UserProfile['settings'], checked: boolean) => {
    setFormData({
      ...formData,
      settings: {
        ...formData.settings,
        [name]: checked
      }
    });
  };
  
  const handleRandomBannerColor = () => {
    const newColor = generateRandomBannerColor();
    setBannerColor(newColor);
    setFormData({
      ...formData,
      bannerColor: newColor
    });
  };
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result);
          setFormData({
            ...formData,
            profilePicture: reader.result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user profile
    const success = updateUserProfile({
      ...formData,
      bannerColor
    });
    
    if (success) {
      navigate(`/channel/${encodeURIComponent(formData.username)}`);
    }
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main 
        className={cn(
          "pt-20 pb-12 transition-all duration-300",
          sidebarOpen ? "ml-60" : "ml-[72px]"
        )}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={handleCancel}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Edit Channel</h1>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="social">Social Links</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile information that viewers will see on your channel page
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="username">Channel Name</Label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Channel Name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          name="displayName"
                          value={formData.displayName}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        This email will be used for account notifications. It won't be visible to viewers.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Channel Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell viewers about your channel..."
                        className="min-h-32"
                      />
                      <p className="text-xs text-muted-foreground">
                        Briefly describe your channel content and what viewers can expect
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        placeholder="Add a more detailed description of your channel, content, upload schedule, and more..."
                        className="min-h-48"
                      />
                      <p className="text-xs text-muted-foreground">
                        Provide a comprehensive overview of your channel, upcoming content plans, and any additional information for your viewers
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="branding">
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Branding</CardTitle>
                    <CardDescription>
                      Customize your channel appearance with profile picture and banner
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={previewImage || formData.profilePicture} 
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-border"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${formData.displayName.charAt(0)}&background=random&color=fff&size=96`;
                            }}
                          />
                          <div className="absolute bottom-0 right-0">
                            <Label 
                              htmlFor="profile-image" 
                              className="cursor-pointer bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                            >
                              <Camera className="h-4 w-4" />
                              <span className="sr-only">Change profile picture</span>
                            </Label>
                            <Input 
                              id="profile-image"
                              type="file" 
                              accept="image/*"
                              className="hidden"
                              onChange={handleProfileImageChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Upload a new profile picture</h4>
                          <p className="text-xs text-muted-foreground">
                            Recommended: Square JPG, PNG, or GIF, at least 400x400 pixels
                          </p>
                          {previewImage && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setPreviewImage(null);
                                setFormData({
                                  ...formData,
                                  profilePicture: getUserProfile().profilePicture
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Channel Banner</Label>
                      <div className="space-y-4">
                        <div 
                          className="w-full h-36 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: bannerColor }}
                        >
                          <div className="text-white text-center p-6">
                            <h3 className="font-bold text-lg">{formData.username}</h3>
                            <p className="text-sm opacity-90">{formData.subscriberCount.toLocaleString()} subscribers</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleRandomBannerColor}
                          >
                            <Paintbrush className="h-4 w-4 mr-2" />
                            Random Color
                          </Button>
                          
                          <div className="flex items-center">
                            <Input
                              type="color"
                              value={bannerColor}
                              onChange={(e) => setBannerColor(e.target.value)}
                              className="w-12 h-10 p-1 rounded border border-border cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="social">
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>
                      Connect your social media accounts to help viewers find you across platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website or Blog</Label>
                      <Input
                        id="website"
                        name="socialLinks.website"
                        value={formData.socialLinks.website || ''}
                        onChange={handleInputChange}
                        placeholder="https://www.example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <div className="flex items-center">
                        <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input text-muted-foreground">
                          @
                        </span>
                        <Input
                          id="twitter"
                          name="socialLinks.twitter"
                          value={formData.socialLinks.twitter || ''}
                          onChange={handleInputChange}
                          placeholder="username"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <div className="flex items-center">
                        <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input text-muted-foreground">
                          @
                        </span>
                        <Input
                          id="instagram"
                          name="socialLinks.instagram"
                          value={formData.socialLinks.instagram || ''}
                          onChange={handleInputChange}
                          placeholder="username"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tiktok">TikTok</Label>
                      <div className="flex items-center">
                        <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input text-muted-foreground">
                          @
                        </span>
                        <Input
                          id="tiktok"
                          name="socialLinks.tiktok"
                          value={formData.socialLinks.tiktok || ''}
                          onChange={handleInputChange}
                          placeholder="username"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable dark mode for a more comfortable viewing experience
                        </p>
                      </div>
                      <Switch
                        id="darkMode"
                        checked={formData.settings.darkMode}
                        onCheckedChange={(checked) => handleSwitchChange('darkMode', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoplay">Autoplay</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically play videos when the page loads
                        </p>
                      </div>
                      <Switch
                        id="autoplay"
                        checked={formData.settings.autoplay}
                        onCheckedChange={(checked) => handleSwitchChange('autoplay', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about new content and activity
                        </p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={formData.settings.notifications}
                        onCheckedChange={(checked) => handleSwitchChange('notifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="restrictedMode">Restricted Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Filter out potentially mature content
                        </p>
                      </div>
                      <Switch
                        id="restrictedMode"
                        checked={formData.settings.restrictedMode}
                        onCheckedChange={(checked) => handleSwitchChange('restrictedMode', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EditChannel; 