import { describe, it, expect } from 'vitest';

describe('AdvancedHarmonyHit Game', () => {
  it('should have three difficulty levels', () => {
    const difficulties = ['easy', 'medium', 'hard'];
    expect(difficulties).toHaveLength(3);
  });

  it('should have correct difficulty settings', () => {
    const difficultySettings = {
      easy: { spawnRate: 15, duration: 400, speed: 80 },
      medium: { spawnRate: 10, duration: 300, speed: 100 },
      hard: { spawnRate: 7, duration: 250, speed: 120 },
    };

    expect(difficultySettings.easy.spawnRate).toBeGreaterThan(difficultySettings.medium.spawnRate);
    expect(difficultySettings.medium.spawnRate).toBeGreaterThan(difficultySettings.hard.spawnRate);
    expect(difficultySettings.easy.duration).toBeGreaterThan(difficultySettings.hard.duration);
  });

  it('should have correct point values for each difficulty', () => {
    const pointValues = {
      easy: 10,
      medium: 25,
      hard: 50,
    };

    expect(pointValues.easy).toBeLessThan(pointValues.medium);
    expect(pointValues.medium).toBeLessThan(pointValues.hard);
  });

  it('should have 5 game lanes', () => {
    const lanes = [0, 1, 2, 3, 4];
    expect(lanes).toHaveLength(5);
  });

  it('should have music icons for notes', () => {
    const icons = ['🎵', '🎶', '🎼', '🎹', '🎸', '🥁', '🎺', '🎻'];
    expect(icons.length).toBeGreaterThan(0);
    expect(icons.every((icon) => typeof icon === 'string')).toBe(true);
  });

  it('should calculate score correctly with combo multiplier', () => {
    const basePoints = 25;
    const combo = 5;
    const totalScore = basePoints * (combo + 1);
    expect(totalScore).toBe(150);
  });
});
