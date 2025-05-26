'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { ThemeProvider, useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { loginSuccess } from '@/redux/slices/authSlice';

export default function SettingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
  
  // Set initial form values
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  
  const handleUpdateProfile = () => {
    if (!user) return;
    
    // Update the user object
    const updatedUser = {
      ...user,
      name,
      email,
    };
    
    // In a real app, this would be an API call
    // For our simulation, we'll update the local storage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          return { ...u, name, email };
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    
    // Update Redux state
    dispatch(loginSuccess(updatedUser));
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would be an API call
    // For our simulation, we'll update the local storage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers && user) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          return { ...u, password };
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    
    setPassword('');
    setConfirmPassword('');
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };
  
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 md:max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center md:flex-row md:items-start gap-6 pb-6 border-b">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG or GIF. Maximum 1MB.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Upload
                    </Button>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateProfile}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="password" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleChangePassword}>Change Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Label htmlFor="dark-mode-switch" className="text-sm text-muted-foreground">
                    {theme === 'dark' ? 'On' : 'Off'}
                  </Label>
                  <Switch
                    id="dark-mode-switch"
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts for price movements and trades
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Label htmlFor="notifications-switch" className="text-sm text-muted-foreground">
                    On
                  </Label>
                  <Switch
                    id="notifications-switch"
                    defaultChecked={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}