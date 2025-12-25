"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { 
  Home,
  Eye,
  Bell,
  Settings,
  Shield,
  FileText,
  Users,
  Grid3X3,
  User,
  BookOpen,
  Package,
  Wrench,
  HeadphonesIcon,
  Library,
  Mail,
  ChevronRight,
  ChevronLeft,
  LogOut,
  LayoutDashboard,
  Image,
  MapPin,
  FileTextIcon,
  ChevronDown,
  ChevronUp,
  Layers,
  UserPlus,
  Briefcase,
  UserCheck,
  UserCog,
  Menu,
  Users2
} from "lucide-react";
import { FaUserShield } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

interface DashboardSidebarProps {
  locale: string;
}

const Sidebar: React.FC<DashboardSidebarProps> = ({ locale }) => {
  const t = useTranslations("Dashboard");
  const tCommon = useTranslations("Common");
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // جميع الروابط بالترتيب المطلوب
  const allLinks = [
    // Home
    { 
      id: "home", 
      label: t("home"), 
      icon: <Home size={20} />, 
      href: `/${locale}`,
      type: "link",
      exact: true
    },
    
    // Visit front page
    { 
      id: "visitFrontPage", 
      label: t("visitFrontPage"), 
      icon: <Eye size={20} />, 
      href: `https://admin.const-tech.biz/en`,
      type: "link",
      exact: true
    },
    
    // Notifications
    { 
      id: "notifications", 
      label: t("notifications"), 
      icon: <Bell size={20} />, 
      href: `/${locale}/notifications`,
      type: "link"
    },
    
    // Divider: Settings section
    {
      id: "settingsDivider",
      label: t("settings"),
      type: "divider"
    },
    
    // Divider: Site sections
    {
      id: "siteSectionsDivider",
      label: t("siteSections"),
      type: "divider"
    },
    
    // Site Sections
    { 
      id: "siteSections", 
      label: t("siteSections"), 
      icon: <Layers size={20} />, 
      href: `/${locale}/categories`,
      type: "link"
    },
    { 
      id: "subCategories", 
      label: t("subCategories"), 
      icon: <MdCategory size={20} />, 
      href: `/${locale}/sub-categories`,
      type: "link"
    },
    
    // Articles
    { 
      id: "articles", 
      label: t("articles"), 
      icon: <BookOpen size={20} />, 
      href: `/${locale}/articles`,
      type: "link"
    },
    
    // Products
    { 
      id: "products", 
      label: t("products"), 
      icon: <Package size={20} />, 
      href: `/${locale}/products`,
      type: "link"
    },
     { 
      id: "vendors", 
      label: t("vendors"), 
      icon: <Users2 size={20} />, 
      href: `/${locale}/vendors`,
      type: "link"
    },
    
    // Site services / Cities
    { 
      id: "cities", 
      label: t("cities"), 
      icon: <Wrench size={20} />, 
      href: `/${locale}/cities`,
      type: "link"
    },

    // Sliders
    { 
      id: "sliders", 
      label: t("sliders"), 
      icon: <Image size={20} />,
      href: `/${locale}/sliders`,
      type: "link"
    },


  {
  id: "roles",
  label: t("roles"),
  icon: <FaUserShield size={20} />,
  href: `/${locale}/roles`,
  type: "link",
},

    // Pages
    { 
      id: "pages", 
      label: t("pages"), 
      icon: <FileText size={20} />,
      href: `/${locale}/pages`,
      type: "link"
    },
    
    { 
      id: "menus", 
      label: t("menus"), 
      icon: <Menu size={20} />, 
      href: `/${locale}/menus`,
      type: "link"
    },
    
    { 
      id: "messages", 
      label: t("messages"), 
      icon: <Mail size={20} />, 
      href: `/${locale}/messages`,
      type: "link"
    },
  ];

  // روابط الإعدادات الداخلية
  const settingsLinks = [
    { 
      id: "settings", 
      label: t("settings"), 
      icon: <Settings size={18} />, 
      href: `/${locale}/settings`
    },
        { 
      id: "privacyPolicy", 
      label: t("privacyPolicy"), 
      icon: <Shield size={18} />, 
      href: `/${locale}/Privacy-policy`
    },
    { 
      id: "usagePolicy", 
      label: t("usagePolicy"), 
      icon: <FileTextIcon size={18} />, 
      href: `/${locale}/policy-usage`
    },
    // { 
    //   id: "moderators", 
    //   label: t("moderators"), 
    //   icon: <Users size={18} />, 
    //   href: `/${locale}/moderators`
    // }
  ];

  // روابط المستخدمين الداخلية
  const usersLinks = [
    { 
      id: "customers", 
      label: t("customers"), 
      icon: <User size={18} />, 
      href: `/${locale}/users`
    },
    { 
      id: "serviceProviders", 
      label: t("serviceProviders"), 
      icon: <Briefcase size={18} />, 
      href: `/${locale}/service-providers`
    },
    // { 
    //   id: "admins", 
    //   label: t("admins"), 
    //   icon: <UserCog size={18} />, 
    //   href: `/${locale}/moderators`
    // }
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    } else {
      return pathname === href || pathname.startsWith(`${href}/`);
    }
  };

  const handleLogout = () => {
    document.cookie = "loggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = `/${locale}/login`;
  };

  // التحقق إذا كان أي رابط في الإعدادات نشط
  const isSettingsActive = settingsLinks.some(link => isActive(link.href));
  const isUsersActive = usersLinks.some(link => isActive(link.href));

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative sidebar overflow-y-auto h-screen 
          bg-gradient-to-b from-gray-900 to-gray-800 
          text-white transition-all duration-300 z-50
          ${locale === "ar" ? "right-0 border-l" : "left-0 border-r"} border-gray-700
          ${collapsed ? "w-16" : "w-72"}
          ${isMobile && !collapsed ? "translate-x-0" : isMobile ? (locale === "ar" ? "translate-x-full" : "-translate-x-full") : "translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard size={20} />
              </div>
              <h2 className="font-bold text-lg">{t("sidebarTitle")}</h2>
            </div>
          )}
          
          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`
              p-2 rounded-lg hover:bg-gray-700 transition-colors
              ${collapsed ? "mx-auto" : ""}
            `}
            aria-label={collapsed ? t("expandSidebar") : t("collapseSidebar")}
          >
            {collapsed ? 
              (locale === "ar" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />) : 
              (locale === "ar" ? <ChevronRight size={20} /> : <ChevronLeft size={20} />)
            }
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-4 space-y-1 flex-1">
          {allLinks.map((item) => {
            if (item.type === "divider") {
              if (collapsed) return null;
              
              if (item.id === "settingsDivider") {
                return (
                  <>
                    <div key={item.id} className="pt-4 mt-4 border-t border-gray-700">
                     
                    </div>
                    
                    {/* Settings Accordion Button */}
                    <button
                      onClick={() => setSettingsOpen(!settingsOpen)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg 
                        transition-all text-sm mt-2
                        ${isSettingsActive || settingsOpen ? "bg-blue-900/30 text-white" : "hover:bg-gray-700 text-gray-300"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Settings size={20} />
                        <span>{t("settings")}</span>
                      </div>
                      <div className={`transition-transform duration-200 ${settingsOpen ? "rotate-180" : ""}`}>
                        <ChevronDown size={16} />
                      </div>
                    </button>
                    
                    {/* Settings Submenu */}
                    {settingsOpen && (
                      <div className="ml-8 mt-2 space-y-1 pl-3 border-l-2 border-gray-600">
                        {settingsLinks.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className={`
                              flex items-center gap-3 p-2 text-sm rounded-lg transition-all
                              ${isActive(subItem.href) 
                                ? "bg-blue-600 text-white" 
                                : "hover:bg-gray-700 text-gray-300"
                              }
                            `}
                          >
                            <span className="flex-shrink-0">{subItem.icon}</span>
                            <span className="truncate">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Users Accordion Button */}
                    <button
                      onClick={() => setUsersOpen(!usersOpen)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg 
                        transition-all text-sm mt-2
                        ${isUsersActive || usersOpen ? "bg-blue-900/30 text-white" : "hover:bg-gray-700 text-gray-300"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Users size={20} />
                        <span>{t("users")}</span>
                      </div>
                      <div className={`transition-transform duration-200 ${usersOpen ? "rotate-180" : ""}`}>
                        <ChevronDown size={16} />
                      </div>
                    </button>
                    
                    {/* Users Submenu */}
                    {usersOpen && (
                      <div className="ml-8 mt-2 space-y-1 pl-3 border-l-2 border-blue-500">
                        {usersLinks.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className={`
                              flex items-center gap-3 p-2 text-sm rounded-lg transition-all
                              ${isActive(subItem.href) 
                                ? "bg-blue-600 text-white" 
                                : "hover:bg-gray-700 text-gray-300"
                              }
                            `}
                          >
                            <span className="flex-shrink-0">{subItem.icon}</span>
                            <span className="truncate">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                );
              }
              
              // Other dividers
              return (
                <div key={item.id} className="pt-4 mt-4 border-t border-gray-700">
                  
                </div>
              );
            }
            
            // Regular link - Skip users link since it's now in accordion
            if (item.id === "users") return null;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center gap-3 p-3 text-sm rounded-lg transition-all
                  ${isActive(item.href, item.exact) 
                    ? "bg-blue-600 text-white" 
                    : "hover:bg-gray-700 text-gray-300"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
                title={collapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
          
          {/* Collapsed version - Just show icons */}
          {collapsed && (
            <>
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`
                  w-full flex items-center justify-center p-3 text-sm rounded-lg 
                  transition-all mt-4
                  ${isSettingsActive || settingsOpen ? "bg-blue-900/30 text-white" : "hover:bg-gray-700 text-gray-300"}
                `}
                title={t("settings")}
              >
                <Settings size={20} />
              </button>
              
              <button
                onClick={() => setUsersOpen(!usersOpen)}
                className={`
                  w-full flex items-center justify-center p-3 text-sm rounded-lg 
                  transition-all mt-2
                  ${isUsersActive || usersOpen ? "bg-blue-900/30 text-white" : "hover:bg-gray-700 text-gray-300"}
                `}
                title={t("users")}
              >
                <Users size={20} />
              </button>
            </>
          )}
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 p-3 rounded-lg 
              hover:bg-red-600 text-gray-300 transition-all
              ${collapsed ? "justify-center" : ""}
            `}
            title={collapsed ? tCommon("logout") : undefined}
          >
            <LogOut size={20} />
            {!collapsed && <span>{tCommon("logout")}</span>}
          </button>
          
          {/* User Profile - Only show when not collapsed */}
          {!collapsed && (
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Admin User</p>
                  <p className="text-sm text-gray-400 truncate">Administrator</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;