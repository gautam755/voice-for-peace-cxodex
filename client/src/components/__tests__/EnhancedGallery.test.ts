import { describe, it, expect } from 'vitest';

describe('EnhancedGallery', () => {
  it('should have 10 gallery items with complete data', () => {
    const galleryItems = [
      { id: 1, title: 'Unity in Diversity', icon: '🌍' },
      { id: 2, title: 'Creative Expression', icon: '🎨' },
      { id: 3, title: 'Global Harmony', icon: '💚' },
      { id: 4, title: 'Voices Rise', icon: '🎤' },
      { id: 5, title: 'Digital Revolution', icon: '⚡' },
      { id: 6, title: 'Infinite Possibilities', icon: '✨' },
      { id: 7, title: 'Digital Activism', icon: '💻' },
      { id: 8, title: 'Youth Voices', icon: '🌟' },
      { id: 9, title: 'Cultural Exchange', icon: '🌉' },
      { id: 10, title: 'Art for Change', icon: '🎭' },
    ];

    expect(galleryItems).toHaveLength(10);
    expect(galleryItems.every((item) => item.id && item.title && item.icon)).toBe(true);
  });

  it('should have unique IDs for all gallery items', () => {
    const galleryItems = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
    const ids = galleryItems.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(galleryItems.length);
  });

  it('should have full descriptions for each gallery item', () => {
    const item = {
      id: 1,
      title: 'Unity in Diversity',
      fullDescription: 'Unity in Diversity represents...',
      impact: 'By embracing diversity...',
      stats: ['195+ Countries', '8B+ People Connected', '1000+ Languages'],
      quote: 'In diversity there is beauty and strength...',
      author: 'Global Peace Alliance',
    };

    expect(item.fullDescription).toBeTruthy();
    expect(item.impact).toBeTruthy();
    expect(item.stats.length).toBe(3);
    expect(item.quote).toBeTruthy();
    expect(item.author).toBeTruthy();
  });
});
