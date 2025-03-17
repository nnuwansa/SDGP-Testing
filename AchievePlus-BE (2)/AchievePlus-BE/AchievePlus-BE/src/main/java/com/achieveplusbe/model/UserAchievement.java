//package com.achieveplusbe.model;
//
//
//
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "user_achievements")
//@Data
//@NoArgsConstructor
//public class UserAchievement {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "reward_id", nullable = false)
//    private Reward reward;
//
//    @Column(nullable = false)
//    private Integer progress;
//
//    @Column(nullable = false)
//    private Boolean completed;
//
//    @Column(name = "completed_at")
//    private LocalDateTime completedAt;
//
//    @Column(name = "created_at")
//    private LocalDateTime createdAt;
//
//    @Column(name = "updated_at")
//    private LocalDateTime updatedAt;
//
//    @PrePersist
//    protected void onCreate() {
//        createdAt = LocalDateTime.now();
//        updatedAt = LocalDateTime.now();
//        completed = false;
//        progress = 0;
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        updatedAt = LocalDateTime.now();
//        if (!completed && progress >= reward.getRequiredCount()) {
//            completed = true;
//            completedAt = LocalDateTime.now();
//        }
//    }
//}