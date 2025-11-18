"use client"
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="text-xs"
      >
        EN
      </Button>
      <span className="text-muted-foreground">|</span>
      <Button
        variant={language === "id" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("id")}
        className="text-xs"
      >
        ID
      </Button>
    </div>
  );
};

const MobileNavigationItems = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col space-y-2">
      <Link
        href="/"
        className="text-sm font-medium py-2 hover:text-muted-foreground transition-colors"
      >
        {t('nav.home')}
      </Link>
      <Link
        href="/our-team"
        className="text-sm font-medium py-2 hover:text-muted-foreground transition-colors"
      >
        {t('nav.ourTeam')}
      </Link>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="activities">
          <AccordionTrigger className="text-sm font-medium">
            {t('nav.activity')}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2 pl-4 py-2">
              <Link href="/practicum" className="text-sm hover:text-muted-foreground">
                {t('nav.practicum')}
              </Link>
              <Link href="/research" className="text-sm hover:text-muted-foreground">
                {t('nav.research')}
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Link
        href="/resource"
        className="text-sm font-medium py-2 hover:text-muted-foreground transition-colors"
      >
        {t('nav.resource')}
      </Link>
    </div>
  );
};

const DesktopNavigationItems = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Link
        href="/"
        className="text-sm font-medium hover:text-muted-foreground transition-colors"
      >
        {t('nav.home')}
      </Link>
      <Link
        href="/our-team"
        className="text-sm font-medium hover:text-muted-foreground transition-colors"
      >
        {t('nav.ourTeam')}
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-muted-foreground transition-colors">
          {t('nav.activity')}
          <ChevronDown className="ml-1 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <DropdownMenuItem asChild>
            <Link href="/practicum">{t('nav.practicum')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/research">{t('nav.research')}</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link
        href="/resource"
        className="text-sm font-medium hover:text-muted-foreground transition-colors"
      >
        {t('nav.resource')}
      </Link>
    </>
  );
};

const Header = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <Image
                src="/images/logo-bpptl.png"
                fill
                style={{ objectFit: 'contain' }}
                priority
                alt="Logo BPPTL"
                sizes="3rem 4rem"
              />
            </div>
            <span className="font-bold text-lg hidden lg:inline">
              {t('labName')}
            </span>
            <span className="font-bold text-lg hidden md:inline lg:hidden">
              BPPTL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DesktopNavigationItems />
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-[300px] p-6">
              <nav className="mt-6">
                <MobileNavigationItems />
              </nav>
              <div className="mt-8 border-t pt-6">
                <LanguageSwitcher />
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;