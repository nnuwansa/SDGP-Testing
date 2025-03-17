//package com.achieveplusbe.controller;
//
//import com.achieveplusbe.model.Reward;
//import com.achieveplusbe.model.UserAchievement;
//import com.achieveplusbe.model.User;
//import com.achieveplusbe.service.RewardService;
//import com.achieveplusbe.service.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/rewards")
//@RequiredArgsConstructor
//public class RewardController {
//    private final RewardService rewardService;
//    private final UserService userService;
//
//    // Admin endpoints
//    @PostMapping("/admin")
//    public ResponseEntity<Reward> createReward(@RequestBody Reward reward) {
//        return ResponseEntity.ok(rewardService.createReward(reward));
//    }
//
//    @PutMapping("/admin/{id}")
//    public ResponseEntity<Reward> updateReward(@PathVariable Long id, @RequestBody Reward reward) {
//        return ResponseEntity.ok(rewardService.updateReward(id, reward));
//    }
//
//    @DeleteMapping("/admin/{id}")
//    public ResponseEntity<Void> deleteReward(@PathVariable Long id) {
//        rewardService.deleteReward(id);
//        return ResponseEntity.ok().build();
//    }
//
//    @GetMapping("/admin/all")
//    public ResponseEntity<List<Reward>> getAllRewards() {
//        return ResponseEntity.ok(rewardService.getAllRewards());
//    }
//
//    // User endpoints
//    @GetMapping("/achievements")
//    public ResponseEntity<List<UserAchievement>> getUserAchievements(@AuthenticationPrincipal User user) {
//        return ResponseEntity.ok(rewardService.getUserAchievements(user));
//    }
//
//    @GetMapping("/points")
//    public ResponseEntity<Map<String, Object>> getUserPoints(@AuthenticationPrincipal User user) {
//        int points = rewardService.calculateUserPoints(user);
//        int level = rewardService.calculateUserLevel(points);
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("points", points);
//        response.put("level", level);
//
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/leaderboard")
//    public ResponseEntity<List<Map<String, Object>>> getLeaderboard(
//            @RequestParam(defaultValue = "all") String timeFrame) {
//        List<User> users = userService.getAllUsers();
//
//        List<Map<String, Object>> leaderboard = users.stream()
//                .map(user -> {
//                    Map<String, Object> entry = new HashMap<>();
//                    int points = rewardService.calculateUserPoints(user);
//                    entry.put("userId", user.getId());
//                    entry.put("username", user.getUsername());
//                    entry.put("points", points);
//                    entry.put("level", rewardService.calculateUserLevel(points));
//                    return entry;
//                })
//                .sorted((a, b) -> Integer.compare((Integer) b.get("points"), (Integer) a.get("points")))
//                .toList();
//
//        return ResponseEntity.ok(leaderboard);
//    }
//
//    // Task completion webhook
//    @PostMapping("/tasks/{taskId}/calculate")
//    public ResponseEntity<Map<String, Object>> calculateTaskReward(
//            @PathVariable Long taskId,
//            @AuthenticationPrincipal User user) {
//        // Calculate points earned
//        int previousPoints = rewardService.calculateUserPoints(user);
//        rewardService.processTaskCompletion(taskService.getTaskById(taskId), user);
//        int newPoints = rewardService.calculateUserPoints(user);
//        int pointsEarned = newPoints - previousPoints;
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("pointsEarned", pointsEarned);
//        response.put("newTotal", newPoints);
//        response.put("newLevel", rewardService.calculateUserLevel(newPoints));
//
//        return ResponseEntity.ok(response);
//    }
//}