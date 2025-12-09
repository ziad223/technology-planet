import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
});

const staticPublicRoutes = [
  '/ar/login', '/en/login',
  '/ar/register', '/en/register',
];

const isPublicPath = (pathname: string): boolean => {
  return staticPublicRoutes.includes(pathname);
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 👈 check login
  const loggedIn = request.cookies.get("loggedIn")?.value === "true";

  // 👈 allow static assets
  const isStaticAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/icons');

  if (isStaticAsset) {
    return intlMiddleware(request);
  }

  // 👈 if user is not logged in → allow only public pages
  if (!loggedIn && !isPublicPath(pathname)) {
    const locale = request.nextUrl.locale || "ar";
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // 👈 if user is logged in & tries to open login/register → redirect to home
  if (loggedIn && isPublicPath(pathname)) {
    const locale = request.nextUrl.locale || "ar";
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // 👈 normal processing (i18n)
  const res = intlMiddleware(request);
  res.headers.set("x-pathname", pathname);
  return res;
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
