'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GeneratedResumes, Resumes } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { HomeIcon, LibraryBig, FileText, Shield, Menu, X, LineChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ModeToggle from './ModeToggle';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

function SideNav() {
  const menuList = [
    { id: 1, name: 'Home', icon: HomeIcon, path: '/' },
    { id: 2, name: 'My Resumes', icon: LibraryBig, path: '/dashboard' },
    { id: 3, name: 'Job Responses', icon: FileText, path: '/dashboard/responses' },
    { id: 4, name: 'Analytics', icon: LineChart, path: '/dashboard/analytics' },
    { id: 5, name: 'Upgrade', icon: Shield, path: '/dashboard/upgrade' }
  ];

  const { user } = useUser();
  const path = usePathname();
  const [resumeList, setResumeList] = useState([]);
  const [generatedResumesList, setGeneratedResumesList] = useState([]);
  const [PercResumeCreated, setPercResumeCreated] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (user) GetResumeList();
  }, [user]);

  const GetResumeList = async () => {
    if (!user) return;

    const resumesResult = await db.select().from(Resumes)
      .where(eq(Resumes.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Resumes.id));

    setResumeList(resumesResult);

    const generatedResumesResult = await db.select().from(GeneratedResumes)
      .where(eq(GeneratedResumes.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(GeneratedResumes.id));

    setGeneratedResumesList(generatedResumesResult);

    const totalResumes = resumesResult.length + generatedResumesResult.length;
    const maxResumes = 3;
    setPercResumeCreated((totalResumes / maxResumes) * 100);
  };

  return (
    <>
      <div className="md:hidden w-full fixed top-0 left-0 z-50 bg-black shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">CraftMyCV</h1>
        <Button variant="outline" size="icon" onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      <aside className={`fixed top-0 left-0 h-screen w-64 shadow-md bg-white border-r ${mobileOpen ? 'block' : 'hidden'} md:block z-40`}>
        <SidebarContent
          path={path}
          menuList={menuList}
          resumeList={resumeList}
          generatedResumesList={generatedResumesList}
          PercResumeCreated={PercResumeCreated}
          onLinkClick={() => setMobileOpen(false)}
        />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <aside className="w-64 bg-black shadow-md border-r">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-white">Menu</h2>
              <Button size="icon" variant="outline" onClick={() => setMobileOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <SidebarContent
              path={path}
              menuList={menuList}
              resumeList={resumeList}
              generatedResumesList={generatedResumesList}
              PercResumeCreated={PercResumeCreated}
              onLinkClick={() => setMobileOpen(false)}
            />
          </aside>
          <div className="flex-1 bg-black opacity-50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}

const SidebarContent = ({ path, menuList, resumeList, generatedResumesList, PercResumeCreated, onLinkClick }) => (
  <Card className="h-full flex flex-col justify-between bg-black text-white rounded-none border-none">
    <ScrollArea className="p-5 h-full">
      <ModeToggle />
      {menuList.map((menu) => (
        <Link
          href={menu.path}
          key={menu.id}
          className={`flex items-center gap-3 p-4 mb-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-700 ${path === menu.path ? 'bg-gray-800' : ''}`}
          onClick={onLinkClick}
        >
          <menu.icon className="w-5 h-5" />
          {menu.name}
        </Link>
      ))}
    </ScrollArea>
    <CardContent className="p-6 w-full border-t border-gray-700">
      <Button className="w-full mb-4 bg-gray-700 hover:bg-white hover:text-gray-800" onClick={onLinkClick}>
        + Create Resume
      </Button>
      <Progress value={PercResumeCreated} className="mb-2" />
      <p className="text-sm text-gray-400">
        <strong>{resumeList.length + generatedResumesList.length}</strong> out of <strong>3</strong> resumes created
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Upgrade your plan for unlimited resume creation.
      </p>
    </CardContent>
  </Card>
);

export default SideNav;