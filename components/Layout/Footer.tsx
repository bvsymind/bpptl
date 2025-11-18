"use client"
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">{t('footer.about')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-muted-foreground transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="/our-team" className="hover:text-muted-foreground transition-colors">
                  {t('nav.ourTeam')}
                </a>
              </li>
              <li>
                <a href="/resource" className="hover:text-muted-foreground transition-colors">
                  {t('nav.resource')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-3">{t('footer.contact')}</h3>
            <p className="text-sm text-muted-foreground">
              Email: bpptl@elektro.undip.ac.id<br />
              Phone: +62 123 4567 890
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          {/* © {currentYear} {t('labName')}. {t('footer.rights')} */}
          © {currentYear} bvsymind | 22120024. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
