
export interface Video {
  id: string;
  episode: number;
  title: string;
  description: string;
  driveId: string;
  duration: string;
  size: string;
  thumbnail: string;
  author: string;
  guest?: string;
}

export interface NavItem {
  label: string;
  path: string;
  active?: boolean;
}
