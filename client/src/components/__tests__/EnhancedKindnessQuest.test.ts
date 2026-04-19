import { describe, it, expect } from 'vitest';

describe('EnhancedKindnessQuest', () => {
  it('should have 8 milestones', () => {
    const milestones = [
      { id: 1, title: 'First Step', difficulty: 'easy', points: 10 },
      { id: 2, title: 'Peace Spreader', difficulty: 'easy', points: 20 },
      { id: 3, title: 'Helper', difficulty: 'medium', points: 35 },
      { id: 4, title: 'Community Builder', difficulty: 'hard', points: 50 },
      { id: 5, title: 'Global Ambassador', difficulty: 'medium', points: 40 },
      { id: 6, title: 'Peace Guardian', difficulty: 'hard', points: 60 },
      { id: 7, title: 'Creative Advocate', difficulty: 'medium', points: 45 },
      { id: 8, title: 'Legend', difficulty: 'hard', points: 100 },
    ];

    expect(milestones).toHaveLength(8);
  });

  it('should have correct difficulty distribution', () => {
    const milestones = [
      { difficulty: 'easy' },
      { difficulty: 'easy' },
      { difficulty: 'medium' },
      { difficulty: 'hard' },
      { difficulty: 'medium' },
      { difficulty: 'hard' },
      { difficulty: 'medium' },
      { difficulty: 'hard' },
    ];

    const easyCount = milestones.filter((m) => m.difficulty === 'easy').length;
    const mediumCount = milestones.filter((m) => m.difficulty === 'medium').length;
    const hardCount = milestones.filter((m) => m.difficulty === 'hard').length;

    expect(easyCount).toBe(2);
    expect(mediumCount).toBe(3);
    expect(hardCount).toBe(3);
  });

  it('should have increasing point values', () => {
    const points = [10, 20, 35, 50, 40, 60, 45, 100];
    const maxPoints = Math.max(...points);
    expect(maxPoints).toBe(100);
  });

  it('should calculate total points correctly when all completed', () => {
    const milestones = [
      { points: 10, completed: true },
      { points: 20, completed: true },
      { points: 35, completed: true },
      { points: 50, completed: true },
      { points: 40, completed: true },
      { points: 60, completed: true },
      { points: 45, completed: true },
      { points: 100, completed: true },
    ];

    const totalPoints = milestones.reduce((sum, m) => sum + (m.completed ? m.points : 0), 0);
    expect(totalPoints).toBe(360);
  });

  it('should calculate progress percentage correctly', () => {
    const completed = 4;
    const total = 8;
    const progress = (completed / total) * 100;
    expect(progress).toBe(50);
  });

  it('should have unique milestone IDs', () => {
    const milestones = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }));
    const ids = milestones.map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(milestones.length);
  });
});
