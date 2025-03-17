//package com.achieveplusbe.service;
//
//
//
//import com.achieveplusbe.model.Reward;
//import com.achieveplusbe.model.User;
//import com.achieveplusbe.model.UserAchievement;
//import com.achieveplusbe.model.Task;
//import com.achieveplusbe.repository.RewardRepository;
//import com.achieveplusbe.repository.UserAchievementRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.time.temporal.ChronoUnit;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class RewardService {
//    private final RewardRepository rewardRepository;
//    private final UserAchievementRepository userAchievementRepository;
//
//    @Transactional
//    public Reward createReward(Reward reward) {
//        return rewardRepository.save(reward);
//    }
//
//    @Transactional
//    public Reward updateReward(Long id, Reward reward) {
//        Reward existingReward = rewardRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Reward not found"));
//
//        existingReward.setTitle(reward.getTitle());
//        existingReward.setDescription(reward.getDescription());
//        existingReward.setPoints(reward.getPoints());
//        existingReward.setRequiredCount(reward.getRequiredCount());
//        existingReward.setType(reward.getType());
//        existingReward.setTimeFrame(reward.getTimeFrame());
//
//        return rewardRepository.save(existingReward);
//    }
//
//    @Transactional
//    public void deleteReward(Long id) {
//        rewardRepository.deleteById(id);
//    }
//
//    public List<Reward> getAllRewards() {
//        return rewardRepository.findAll();
//    }
//
//    @Transactional
//    public void processTaskCompletion(Task task, User user) {
//        // Process early completion reward
//        if (task.getDueDate() != null && LocalDateTime.now().isBefore(task.getDueDate())) {
//            List<Reward> earlyCompletionRewards = rewardRepository.findByType(Reward.RewardType.TASK_COMPLETION);
//            for (Reward reward : earlyCompletionRewards) {
//                processAchievement(user, reward);
//            }
//        }
//
//        // Process weekly performance
//        processWeeklyPerformance(user);
//    }
//
//    private void processAchievement(User user, Reward reward) {
//        UserAchievement achievement = userAchievementRepository.findByUserAndReward(user, reward)
//                .orElseGet(() -> {
//                    UserAchievement newAchievement = new UserAchievement();
//                    newAchievement.setUser(user);
//                    newAchievement.setReward(reward);
//                    return newAchievement;
//                });
//
//        achievement.setProgress(achievement.getProgress() + 1);
//        userAchievementRepository.save(achievement);
//    }
//
//    private void processWeeklyPerformance(User user) {
//        LocalDateTime weekStart = LocalDateTime.now().minus(7, ChronoUnit.DAYS);
//        List<UserAchievement> weeklyAchievements = userAchievementRepository
//                .findByUserAndCompletedAfter(user, weekStart);
//
//        List<Reward> weeklyRewards = rewardRepository.findByType(Reward.RewardType.WEEKLY_PERFORMANCE);
//        for (Reward reward : weeklyRewards) {
//            if (weeklyAchievements.size() >= reward.getRequiredCount()) {
//                processAchievement(user, reward);
//            }
//        }
//    }
//
//    public List<UserAchievement> getUserAchievements(User user) {
//        return userAchievementRepository.findByUser(user);
//    }
//
//    public int calculateUserPoints(User user) {
//        List<UserAchievement> completedAchievements = userAchievementRepository
//                .findByUserAndCompleted(user, true);
//
//        return completedAchievements.stream()
//                .mapToInt(achievement -> achievement.getReward().getPoints())
//                .sum();
//    }
//
//    public int calculateUserLevel(int points) {
//        // Define level thresholds
//        final int[] levelThresholds = {0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500};
//
//        for (int i = levelThresholds.length - 1; i >= 0; i--) {
//            if (points >= levelThresholds[i]) {
//                return i + 1;
//            }
//        }
//        return 1;
//    }
//}