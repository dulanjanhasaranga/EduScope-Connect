package com.educonnect.config;

import com.educonnect.model.EcosystemProduct;
import com.educonnect.model.Tag;
import com.educonnect.repository.EcosystemProductRepository;
import com.educonnect.repository.TagRepository;
import com.educonnect.model.User;
import com.educonnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Profile;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Component
@Profile("!prod")
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private EcosystemProductRepository ecosystemProductRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedEcosystemProducts();
        seedTags();
    }

    private void seedUsers() {
        java.util.Optional<User> dulanjanOpt = userRepository.findByEmail("dulanjan.connect@gmail.com");
        if (!dulanjanOpt.isPresent()) {
            User dulanjanAdmin = User.builder()
                    .username("Dulanjan")
                    .email("dulanjan.connect@gmail.com")
                    .passwordHash(passwordEncoder.encode("Password123!"))
                    .role(User.Role.ADMIN)
                    .bio("Super Administrator")
                    .avatarUrl("https://ui-avatars.com/api/?name=Dulanjan&background=0063ce&color=fff")
                    .reputationScore(1000)
                    .build();
            userRepository.save(dulanjanAdmin);
        } else {
            User existing = dulanjanOpt.get();
            if (existing.getRole() != User.Role.ADMIN) {
                existing.setRole(User.Role.ADMIN);
                userRepository.save(existing);
            }
        }

        if (userRepository.count() <= 1) {
            // Seed Admin
            if (!userRepository.findByEmail("admin@eduscope.com").isPresent()) {
                User admin = User.builder()
                        .username("admin")
                        .email("admin@eduscope.com")
                        .passwordHash(passwordEncoder.encode("admin123"))
                        .role(User.Role.ADMIN)
                        .bio("System Administrator")
                        .avatarUrl("https://ui-avatars.com/api/?name=Admin&background=0063ce&color=fff")
                        .reputationScore(0)
                        .build();
                userRepository.save(admin);
            }

            // Seed Professional Leaders
            List<User> leaders = Arrays.asList(
                    User.builder()
                            .username("Dr. Sarah Chen")
                            .email("sarah.chen@university.edu")
                            .passwordHash(passwordEncoder.encode("password123"))
                            .role(User.Role.STUDENT)
                            .bio("Professor of Computer Science specializing in AI and Machine Learning.")
                            .avatarUrl(
                                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80")
                            .reputationScore(1540)
                            .build(),
                    User.builder()
                            .username("Prof. M. Johnson")
                            .email("mjohnson@institute.org")
                            .passwordHash(passwordEncoder.encode("password123"))
                            .role(User.Role.STUDENT)
                            .bio("Department Head of Applied Mathematics. Passionate about helping students understand calculus.")
                            .avatarUrl(
                                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80")
                            .reputationScore(850)
                            .build(),
                    User.builder()
                            .username("Elena Rodriguez, PhD")
                            .email("erodriguez@research.edu")
                            .passwordHash(passwordEncoder.encode("password123"))
                            .role(User.Role.STUDENT)
                            .bio("Postdoctoral researcher in Biochemistry. Happy to answer questions about molecular biology.")
                            .avatarUrl(
                                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80")
                            .reputationScore(430)
                            .build(),
                    User.builder()
                            .username("Dr. Akira Tanaka")
                            .email("atanaka@medschool.edu")
                            .passwordHash(passwordEncoder.encode("password123"))
                            .role(User.Role.STUDENT)
                            .bio("Clinical Instructor and practicing physician. Medical science enthusiast.")
                            .avatarUrl(
                                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&q=80")
                            .reputationScore(210)
                            .build(),
                    User.builder()
                            .username("James Miller")
                            .email("jmiller@tech.com")
                            .passwordHash(passwordEncoder.encode("password123"))
                            .role(User.Role.STUDENT)
                            .bio("Senior Software Engineer. Mentoring the next generation of developers.")
                            .avatarUrl(
                                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80")
                            .reputationScore(115)
                            .build(),
                    User.builder()
                            .username("Dr. Anita Patel")
                            .email("apatel@science.edu")
                            .passwordHash(passwordEncoder.encode("password123"))
                            .role(User.Role.STUDENT)
                            .bio("Physics Lecturer. Let's solve complex problems together!")
                            .avatarUrl(
                                    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&q=80")
                            .reputationScore(65)
                            .build());
            userRepository.saveAll(leaders);
        }
    }

    private void seedEcosystemProducts() {
        ecosystemProductRepository.deleteAll();
        List<EcosystemProduct> products = Arrays.asList(
                EcosystemProduct.builder()
                        .id("facultylens")
                        .name("FacultyLens")
                        .category("Analytics")
                        .tagline("Performance Analytics")
                        .description(
                                "AI-powered faculty performance evaluation and analytics platform. Tracks teaching effectiveness through student feedback analysis, peer reviews, and outcome metrics to drive institutional excellence.")
                        .icon("BarChart3")
                        .color("from-blue-500 to-cyan-500")
                        .bgColor("bg-blue-50")
                        .borderColor("border-blue-200")
                        .iconColor("text-blue-600")
                        .imageUrl("/images/ecosystem/facultylens.png")
                        .features(Arrays.asList(
                                "AI-driven sentiment analysis of student feedback",
                                "Peer review management and calibration",
                                "Institutional benchmarking reports"))
                        .build(),
                EcosystemProduct.builder()
                        .id("bevinzey")
                        .name("Bevinzey")
                        .category("Learning")
                        .tagline("AI Study Assistant")
                        .description(
                                "An intelligent study companion powered by advanced AI that adapts to each student's learning style. Generates personalized study plans, practice questions, and provides real-time tutoring support.")
                        .icon("Bot")
                        .color("from-purple-500 to-pink-500")
                        .bgColor("bg-purple-50")
                        .borderColor("border-purple-200")
                        .iconColor("text-purple-600")
                        .imageUrl("/images/ecosystem/bevinzey.png")
                        .features(Arrays.asList(
                                "Personalized adaptive learning paths",
                                "AI-generated practice questions & quizzes",
                                "Progress tracking and knowledge gap analysis"))
                        .build(),
                EcosystemProduct.builder()
                        .id("evalometrics")
                        .name("Evalometrics")
                        .category("Analytics")
                        .tagline("Assessment Tools")
                        .description(
                                "Comprehensive assessment creation and grading platform with AI-assisted question generation, plagiarism detection, and detailed performance analytics for educators and institutions.")
                        .icon("GraduationCap")
                        .color("from-emerald-500 to-teal-500")
                        .bgColor("bg-emerald-50")
                        .borderColor("border-emerald-200")
                        .iconColor("text-emerald-600")
                        .imageUrl("/images/ecosystem/evalometrics.png")
                        .features(Arrays.asList(
                                "AI-assisted question bank generation",
                                "Automated grading with rubric support",
                                "Performance analytics and learning outcome mapping"))
                        .build(),
                EcosystemProduct.builder()
                        .id("studysocius")
                        .name("StudySocius")
                        .category("Social")
                        .tagline("Collaborative Hub")
                        .description(
                                "A social learning network that connects students across courses and disciplines. Facilitates peer-to-peer tutoring, collaborative study groups, and resource sharing in a moderated environment.")
                        .icon("Users2")
                        .color("from-orange-500 to-amber-500")
                        .bgColor("bg-orange-50")
                        .borderColor("border-orange-200")
                        .iconColor("text-orange-600")
                        .imageUrl("/images/ecosystem/studysocius.png")
                        .features(Arrays.asList(
                                "Intelligent study group matching",
                                "Collaborative document annotation",
                                "Community discussion boards"))
                        .build(),
                EcosystemProduct.builder()
                        .id("rxcalculations")
                        .name("RxCalculations")
                        .category("Medical")
                        .tagline("Pharmacy Engine")
                        .description(
                                "Specialized educational suite for pharmacy and medical students to master complex dosage calculations, pharmacokinetics, and clinical decision making with simulated patient scenarios.")
                        .icon("Pill")
                        .color("from-red-500 to-rose-500")
                        .bgColor("bg-red-50")
                        .borderColor("border-red-200")
                        .iconColor("text-red-600")
                        .imageUrl("/images/ecosystem/rxcalculations.png")
                        .features(Arrays.asList(
                                "Interactive dosage calculation tutorials",
                                "Pharmacokinetic modeling simulations",
                                "Certification exam preparation"))
                        .build());
        ecosystemProductRepository.saveAll(products);
    }

    private void seedTags() {
        Map<String, List<String>> categories = Map.of(
                "Programming & Tech", Arrays.asList(
                        "javascript", "python", "java", "c#", "php", "c++", "c", "typescript", "ruby", "swift",
                        "kotlin", "go", "rust", "dart", "scala", "perl", "haskell", "lua", "r", "matlab", "assembly",
                        "shell", "powershell",
                        "react", "angular", "vue", "svelte", "next.js", "nuxt.js", "gatsby", "html", "css", "sass",
                        "less", "tailwind", "bootstrap", "node.js", "express", "django", "flask", "spring-boot",
                        "laravel", "asp.net", "ruby-on-rails", "fastapi",
                        "sql", "mysql", "postgresql", "sqlite", "oracle", "sql-server", "mongodb", "redis", "cassandra",
                        "dynamodb", "neo4j", "firebase", "supabase", "elasticsearch",
                        "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ansible", "jenkins",
                        "github-actions", "gitlab-ci", "linux", "unix", "bash", "nginx", "apache",
                        "machine-learning", "deep-learning", "artificial-intelligence", "neural-networks", "nlp",
                        "computer-vision", "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "keras",
                        "data-analysis", "big-data", "hadoop", "spark",
                        "algorithms", "data-structures", "operating-systems", "networking", "cryptography", "security",
                        "distributed-systems", "software-engineering", "design-patterns", "agile", "scrum", "git",
                        "github", "bitbucket"),
                "Engineering & Science", Arrays.asList(
                        "thermodynamics", "fluid-mechanics", "circuit-analysis", "calculus", "linear-algebra",
                        "physics", "chemistry", "biology", "genetics",
                        "statistics", "discrete-math", "differential-equations", "materials-science", "robotics",
                        "aerospace", "civil-engineering", "mechanical-engineering",
                        "astronomy", "environmental-science", "quantum-mechanics", "organic-chemistry", "biochemistry"),
                "Medicine & Health", Arrays.asList(
                        "anatomy", "pharmacology", "physiology", "pathology", "clinical-skills", "public-health",
                        "nursing", "dentistry",
                        "neuroscience", "immunology", "microbiology", "epidemiology", "pediatrics", "surgery",
                        "psychiatry", "cardiology"),
                "Business & Economics", Arrays.asList(
                        "microeconomics", "macroeconomics", "accounting", "marketing", "management", "finance",
                        "entrepreneurship",
                        "corporate-finance", "investment", "business-analytics", "supply-chain", "human-resources",
                        "strategy"),
                "Arts & Humanities", Arrays.asList(
                        "history", "literature", "philosophy", "sociology", "psychology", "art-history", "linguistics",
                        "political-science",
                        "anthropology", "ethics", "theology", "music-theory", "creative-writing", "media-studies",
                        "geography"));

        categories.forEach((category, tags) -> {
            tags.forEach(tagName -> {
                if (tagRepository.findByName(tagName).isEmpty()) {
                    tagRepository.save(Tag.builder().name(tagName).category(category).build());
                }
            });
        });
    }
}
