//package com.achieveplusbe.repository;
//
//
//
//import com.achieveplusbe.model.Reward;
//import com.achieveplusbe.model.UserAchievement;
//import com.achieveplusbe.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
//    List<UserAchievement> findByUser(User user);
//    List<UserAchievement> findByUserAndCompleted(User user, Boolean completed);
//    Long countByUserAndCompleted(User user, Boolean completed);
//
//    Optional<UserAchievement> findByUserAndReward(User user, Reward reward);
//
//    List<UserAchievement> findByUserAndCompletedAfter(User user, LocalDateTime weekStart);
//}