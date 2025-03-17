//package com.achieveplusbe.model;
//
//
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "rewards")
//@Data
//@NoArgsConstructor
//public class Reward {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String title;
//
//    @Column(nullable = false)
//    private String description;
//
//    @Column(nullable = false)
//    private Integer points;
//
//    @Column(name = "required_count", nullable = false)
//    private Integer requiredCount;
//
//    @Column(nullable = false)
//    @Enumerated(EnumType.STRING)
//    private RewardType type;
//
//    @Column(name = "time_frame")
//    @Enumerated(EnumType.STRING)
//    private TimeFrame timeFrame;
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
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        updatedAt = LocalDateTime.now();
//    }
//
//    public enum RewardType {
//        TASK_COMPLETION,
//        WEEKLY_PERFORMANCE,
//        TEAM_CONTRIBUTION,
//        SKILL_MASTERY
//    }
//
//    public enum TimeFrame {
//        NONE,
//        DAY,
//        WEEK,
//        MONTH,
//        QUARTER
//    }
//}