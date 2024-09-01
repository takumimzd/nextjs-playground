const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "forgot_password": {
    $url: (url?: { hash?: string }) => ({ pathname: '/forgot-password' as const, hash: url?.hash, path: `/forgot-password${buildSuffix(url)}` })
  },
  "sign_in": {
    $url: (url?: { hash?: string }) => ({ pathname: '/sign-in' as const, hash: url?.hash, path: `/sign-in${buildSuffix(url)}` })
  },
  "sign_up": {
    $url: (url?: { hash?: string }) => ({ pathname: '/sign-up' as const, hash: url?.hash, path: `/sign-up${buildSuffix(url)}` })
  },
  "protected": {
    "reset_password": {
      $url: (url?: { hash?: string }) => ({ pathname: '/protected/reset-password' as const, hash: url?.hash, path: `/protected/reset-password${buildSuffix(url)}` })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/protected' as const, hash: url?.hash, path: `/protected${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  favicon_ico: '/favicon.ico',
  opengraph_image_png: '/opengraph-image.png',
  twitter_image_png: '/twitter-image.png'
} as const;

export type StaticPath = typeof staticPath;
