package com.educonnect.config;

import com.educonnect.model.EcosystemProduct;
import com.educonnect.model.Tag;
import com.educonnect.model.User;
import com.educonnect.model.AuditLog;
import com.educonnect.model.SystemSetting;
import com.educonnect.repository.EcosystemProductRepository;
import com.educonnect.repository.TagRepository;
import com.educonnect.repository.UserRepository;
import com.educonnect.repository.AuditLogRepository;
import com.educonnect.repository.SystemSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.educonnect.model.Question;
import com.educonnect.model.Answer;
import com.educonnect.model.Vote;
import com.educonnect.model.Vote.VoteType;
import com.educonnect.model.QuestionVote;
import com.educonnect.repository.QuestionRepository;
import com.educonnect.repository.AnswerRepository;
import com.educonnect.repository.VoteRepository;
import com.educonnect.repository.QuestionVoteRepository;
import com.educonnect.repository.GroupMessageRepository;
import com.educonnect.model.GroupMessage;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
@Transactional
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

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private QuestionVoteRepository questionVoteRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    @Autowired
    private com.educonnect.repository.AssessmentRepository assessmentRepository;

    @Autowired
    private com.educonnect.repository.StudyGroupRepository studyGroupRepository;

    @Autowired
    private GroupMessageRepository groupMessageRepository;

    @Override
    public void run(String... args) throws Exception {
        seedSystemSettings();
        seedUsers();
        seedEcosystemProducts();
        seedTags();
        seedAssessments();
        seedStudyGroups();
        seedNewStudentsAndActivity();
        seedHistoricalAnswersForLeaders();
        seedAuditLogs();
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
                            .role(User.Role.LEADER)
                            .bio("Professor of Computer Science specializing in AI and Machine Learning.")
                            .avatarUrl(
                                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80")
                            .reputationScore(1540)
                            .build(),
                    User.builder()
                            .username("Prof. M. Johnson")
                            .email("mjohnson@institute.org")
                            .passwordHash(passwordEncoder.encode("password123"))
                            .role(User.Role.LEADER)
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
                        .tagline("Smart Faculty Workload Analytics")
                        .description(
                                "Analyze and balance faculty workload across teaching, research, and service with powerful dashboards and AI-generated insights.")
                        .icon("BarChart3")
                        .color("from-blue-500 to-cyan-500")
                        .bgColor("bg-blue-50")
                        .borderColor("border-blue-200")
                        .iconColor("text-blue-600")
                        .imageUrl("/images/ecosystem/facultylens.png")
                        .features(Arrays.asList(
                                "Workload Analytics",
                                "AI-Generated Insights",
                                "Teaching, Research, & Service Balancing"))
                        .build(),
                EcosystemProduct.builder()
                        .id("bevinzey")
                        .name("Bevinzey")
                        .category("Learning")
                        .tagline("AI-Powered Study Tools")
                        .description(
                                "Transform how you learn with AI-powered summarization, question generation, lecture transcription, and personalized tutoring. Built for students, educators, and institutions.")
                        .icon("Bot")
                        .color("from-purple-500 to-pink-500")
                        .bgColor("bg-purple-50")
                        .borderColor("border-purple-200")
                        .iconColor("text-purple-600")
                        .imageUrl("/images/ecosystem/bevinzey.png")
                        .features(Arrays.asList(
                                "Smart Document Summarization",
                                "Auto-generated Practice Questions",
                                "24/7 AI Tutor Support"))
                        .build(),
                EcosystemProduct.builder()
                        .id("evalometrics")
                        .name("Evalometrics")
                        .category("Analytics")
                        .tagline("LLM Evaluation Framework")
                        .description(
                                "The open-source LLM evaluation framework. Offers 50+ state-of-the-art, ready-to-use metrics for evaluating LLMs, including G-Eval, RAG metrics, and custom criteria.")
                        .icon("GraduationCap")
                        .color("from-emerald-500 to-teal-500")
                        .bgColor("bg-emerald-50")
                        .borderColor("border-emerald-200")
                        .iconColor("text-emerald-600")
                        .imageUrl("/images/ecosystem/evalometrics.png")
                        .features(Arrays.asList(
                                "50+ SOTA LLM Metrics",
                                "G-Eval & Custom Criteria",
                                "End-to-End LLM Evals"))
                        .build(),
                EcosystemProduct.builder()
                        .id("studysocius")
                        .name("StudySocius")
                        .category("Social")
                        .tagline("Productivity Companion")
                        .description(
                                "The student's quintessential productivity companion designed to boost efficiency. Accessible on all devices, from PCs and tablets to mobile phones, for streamlined studies.")
                        .icon("Users2")
                        .color("from-orange-500 to-amber-500")
                        .bgColor("bg-orange-50")
                        .borderColor("border-orange-200")
                        .iconColor("text-orange-600")
                        .imageUrl("/images/ecosystem/studysocius.png")
                        .features(Arrays.asList(
                                "Study Goals Tracking",
                                "Assignment Management",
                                "Cross-Device Accessibility"))
                        .build(),
                EcosystemProduct.builder()
                        .id("rxcalculations")
                        .name("RxCalculations")
                        .category("Medical")
                        .tagline("Pharmacy Calculations")
                        .description(
                                "Top quality pharmaceutical calculations resources: online practice question banks, video tutorials, courses, books, apps and private tutoring to help pharmacy students ace the NAPLEX.")
                        .icon("Pill")
                        .color("from-red-500 to-rose-500")
                        .bgColor("bg-red-50")
                        .borderColor("border-red-200")
                        .iconColor("text-red-600")
                        .imageUrl("/images/ecosystem/rxcalculations.png")
                        .features(Arrays.asList(
                                "Online Practice Question Banks",
                                "Video Tutorials & Courses",
                                "NAPLEX Exam Prep"))
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

    private void seedQuestionsAndAnswers() {
        // Handled in seedNewStudentsAndActivity
    }

    private void seedSystemSettings() {
        if (systemSettingRepository.count() == 0) {
            System.out.println("Seeding System Settings...");
            List<SystemSetting> settings = Arrays.asList(
                    SystemSetting.builder().key("MAINTENANCE_MODE").value("false").description("Enable to put the site into maintenance mode.").build(),
                    SystemSetting.builder().key("ALLOW_PUBLIC_REGISTRATION").value("true").description("Allow new users to register an account.").build(),
                    SystemSetting.builder().key("MAX_UPLOAD_SIZE_MB").value("50").description("Maximum allowed file upload size in MB.").build(),
                    SystemSetting.builder().key("SUPPORT_EMAIL").value("support@eduscopeglobal.com").description("Email address for user support inquiries.").build()
            );
            systemSettingRepository.saveAll(settings);
        }
    }

    private void seedAuditLogs() {
        if (auditLogRepository.count() == 0) {
            System.out.println("Seeding Audit Logs...");
            User admin = userRepository.findByEmail("dulanjan.connect@gmail.com").orElse(null);
            if (admin == null) return;
            
            List<AuditLog> logs = Arrays.asList(
                    AuditLog.builder().action("UPDATED_SETTING").entityName("SystemSetting").entityId(1L).performedBy(admin).details("Changed MAINTENANCE_MODE from true to false").timestamp(LocalDateTime.now().minusDays(0)).build(),
                    AuditLog.builder().action("DELETED_QUESTION").entityName("Question").entityId(99L).performedBy(admin).details("Deleted spam question 'buy cheap watches'").timestamp(LocalDateTime.now().minusHours(12)).build(),
                    AuditLog.builder().action("PROMOTED_USER").entityName("User").entityId(3L).performedBy(admin).details("Promoted user erodriguez@research.edu to LEADER role").timestamp(LocalDateTime.now().minusHours(5)).build(),
                    AuditLog.builder().action("CREATED_ECOSYSTEM_APP").entityName("EcosystemProduct").entityId(5L).performedBy(admin).details("Added RxCalculations product").timestamp(LocalDateTime.now().minusMinutes(30)).build()
            );
            auditLogRepository.saveAll(logs);
        }
    }
    private void seedHistoricalAnswersForLeaders() {
        System.out.println("Seeding historical answers for leaders...");
        User admin = userRepository.findByEmail("dulanjan.connect@gmail.com").orElse(null);
        if (admin == null) return;
        
        // We only want to seed once
        if (answerRepository.findByAuthor(admin).size() > 10) return;
        
        Question dummyQ = questionRepository.findAll().get(0);

        // Spread answers over the past 6 months to populate the engagement chart
        for (int i = 0; i < 6; i++) {
            int answersInMonth = 15 + (int)(Math.random() * 30); // 15 to 45 answers per month
            for (int j = 0; j < answersInMonth; j++) {
                Answer a = Answer.builder()
                        .body("Historical answer for month offset " + i)
                        .author(admin)
                        .question(dummyQ)
                        .isAccepted(false)
                        .voteCount(0)
                        .createdAt(LocalDateTime.now().minusMonths(i).minusDays((int)(Math.random() * 28)))
                        .build();
                answerRepository.save(a);
            }
        }
    }

    private void seedAssessments() {
        if (assessmentRepository.count() > 0) return;
        System.out.println("Seeding assessments...");
        User admin = userRepository.findByEmail("dulanjan.connect@gmail.com").orElse(null);
        if (admin == null) return;

        com.educonnect.model.Assessment a1 = com.educonnect.model.Assessment.builder()
            .title("Advanced Pharmacokinetics Quiz")
            .description("Test your knowledge on half-life, clearance, and Vd.")
            .author(admin)
            .build();
            
        a1.setQuestions(Arrays.asList(
            com.educonnect.model.AssessmentQuestion.builder()
                .text("What happens to half-life if clearance decreases and Vd is constant?")
                .options(Arrays.asList("Increases", "Decreases", "Stays the same"))
                .correctOptionIndex(0)
                .assessment(a1)
                .build(),
            com.educonnect.model.AssessmentQuestion.builder()
                .text("Which order kinetics exhibits a constant amount of drug eliminated per unit time?")
                .options(Arrays.asList("First-order", "Zero-order", "Second-order"))
                .correctOptionIndex(1)
                .assessment(a1)
                .build()
        ));
        
        com.educonnect.model.Assessment a2 = com.educonnect.model.Assessment.builder()
            .title("Clinical Pathophysiology Exam")
            .description("Comprehensive exam on disease mechanisms.")
            .author(admin)
            .build();
            
        a2.setQuestions(Arrays.asList(
            com.educonnect.model.AssessmentQuestion.builder()
                .text("What is the hallmark of restrictive lung disease?")
                .options(Arrays.asList("Decreased FEV1/FVC", "Increased TLC", "Decreased TLC"))
                .correctOptionIndex(2)
                .assessment(a2)
                .build()
        ));
        
        assessmentRepository.save(a1);
        assessmentRepository.save(a2);
    }

    private void seedStudyGroups() {
        if (studyGroupRepository.count() > 0) return;
        System.out.println("Seeding study groups...");
        User admin = userRepository.findByEmail("dulanjan.connect@gmail.com").orElse(null);
        if (admin == null) return;

        com.educonnect.model.StudyGroup g1 = com.educonnect.model.StudyGroup.builder()
            .name("Advanced Machine Learning")
            .description("A group for discussing deep learning, neural networks, and AI research.")
            .category("Computer Science")
            .owner(admin)
            .build();
            
        com.educonnect.model.StudyGroup g2 = com.educonnect.model.StudyGroup.builder()
            .name("Clinical Pathophysiology Prep")
            .description("Preparation for the upcoming pathophysiology exams. Share notes and quiz each other.")
            .category("Medicine")
            .owner(admin)
            .build();

        com.educonnect.model.StudyGroup g3 = com.educonnect.model.StudyGroup.builder()
            .name("Calculus 101 Support")
            .description("Struggling with derivatives? Let's help each other out in Calculus.")
            .category("Mathematics")
            .owner(admin)
            .build();

        studyGroupRepository.saveAll(Arrays.asList(g1, g2, g3));
    }
    
private void seedNewStudentsAndActivity() {
        if (userRepository.findByEmail("shenalkavindu@gmail.com").isPresent()) {
            return;
        }

        String[] firstNames = {"Shenal", "Yenuli", "Nethmi", "Kaveesha", "Malshan", "Dinuka", "Sachini", "Tharindu", "Kasun", "Piumi", "Dulmini", "Chathura", "Sandun", "Nishantha", "Hasini", "Isuru", "Supun", "Chamara", "Nuwan", "Rumesh"};
        String[] lastNames = {"Kavindu", "Himasha", "Nisansala", "Dilshan", "Fernando", "Perera", "Silva", "Kumara", "Jayasooriya", "Rajapaksha", "Gunathilaka", "Bandara", "Senanayake", "Rathnayake", "Dissanayake", "Wijerathne", "Samaranayake", "Jayasekara", "Ranasinghe", "Weerasinghe"};

        List<com.educonnect.model.StudyGroup> groups = studyGroupRepository.findAll();
        if (groups.size() < 3) return;
        
        com.educonnect.model.StudyGroup csGroup = groups.get(0); // Machine Learning
        com.educonnect.model.StudyGroup medGroup = groups.get(1); // Medicine
        com.educonnect.model.StudyGroup mathGroup = groups.get(2); // Mathematics

        // Ensure categories match for tagging
        Tag mlTag = tagRepository.findByName("machine-learning").orElseGet(() -> tagRepository.save(Tag.builder().name("machine-learning").category("Computer Science").build()));
        Tag medTag = tagRepository.findByName("biology").orElseGet(() -> tagRepository.save(Tag.builder().name("biology").category("Medicine").build()));
        Tag mathTag = tagRepository.findByName("mathematics").orElseGet(() -> tagRepository.save(Tag.builder().name("mathematics").category("Mathematics").build()));

        List<User> newStudents = new java.util.ArrayList<>();
        
        // Base date calculation for June-August
        LocalDateTime baseDate = LocalDateTime.of(2026, 6, 1, 0, 0);

        String[] csQuestions = {
            "What is the best way to handle vanishing gradients in deep RNNs?",
            "Can someone explain the self-attention mechanism in Transformers?",
            "How does Adam optimizer differ from RMSprop in practice?",
            "What are the ethical implications of using facial recognition AI?",
            "Is fine-tuning BERT always better than training a smaller model from scratch?",
            "How do graph neural networks aggregate node features?",
            "What's the difference between L1 and L2 regularization mathematically?"
        };
        String[] csAnswers = {
            "Using LSTMs or GRUs is the standard way to mitigate this. They use gating mechanisms.",
            "Self-attention allows the model to weigh the importance of different words in a sentence simultaneously.",
            "Adam essentially combines the benefits of both AdaGrad and RMSProp by using momentum.",
            "Bias in training data can lead to discriminatory outcomes, making it a critical issue.",
            "Fine-tuning leverages pre-trained representations, which usually saves time and data.",
            "They use message passing, where each node aggregates features from its immediate neighbors.",
            "L1 encourages sparsity (feature selection), while L2 prevents large weights (ridge)."
        };

        String[] medQuestions = {
            "What are the latest advancements in targeted mRNA therapies?",
            "How do ACE inhibitors actually lower blood pressure?",
            "Can CRISPR-Cas9 be used to treat somatic mutations effectively?",
            "What is the physiological mechanism behind insulin resistance?",
            "How does the blood-brain barrier selectively transport nutrients?",
            "What role do T-cells play in autoimmune diseases?",
            "Are there any viable alternatives to antibiotics for resistant strains?"
        };
        String[] medAnswers = {
            "Lipid nanoparticle delivery systems have drastically improved targeting.",
            "They block the conversion of angiotensin I to angiotensin II, preventing vasoconstriction.",
            "Yes, trials for conditions like sickle cell anemia show immense promise in somatic cells.",
            "Receptor downregulation and intracellular signaling defects cause insulin resistance.",
            "It uses specific transport proteins and tight junctions between endothelial cells.",
            "Autoreactive T-cells mistakenly identify self-antigens as foreign and attack tissues.",
            "Bacteriophage therapy is currently being heavily researched for multi-drug resistant bacteria."
        };

        String[] mathQuestions = {
            "Is there an intuitive geometric proof for Euler's Identity?",
            "How do we prove the irrationality of the square root of 2?",
            "What is the practical application of topology in computer science?",
            "Can someone explain the Riemann Hypothesis simply?",
            "How does gradient descent relate to vector calculus?",
            "What is the significance of eigenvalues in differential equations?"
        };
        String[] mathAnswers = {
            "Yes, think of it as rotation in the complex plane by pi radians, landing at -1.",
            "By contradiction: assume it's a/b (lowest terms), then a^2 = 2b^2 implies a is even...",
            "Topology is used in data analysis (TDA) to find shape-based patterns in high-dimensional data.",
            "It states that all non-trivial zeros of the zeta function have a real part of 1/2.",
            "Gradient is the vector of partial derivatives, pointing in the direction of steepest ascent.",
            "They determine the stability and behavior of solutions to systems of linear ODEs."
        };

        for (int i = 0; i < 20; i++) {
            String firstName = firstNames[i];
            String lastName = lastNames[i];
            String email = firstName.toLowerCase() + lastName.toLowerCase() + "@gmail.com";
            String password = firstName + "1@";
            
            User student = User.builder()
                    .username(firstName + " " + lastName)
                    .email(email)
                    .passwordHash(passwordEncoder.encode(password))
                    .role(User.Role.STUDENT)
                    .bio("Student at EduScope.")
                    .avatarUrl("https://ui-avatars.com/api/?name=" + firstName + "+" + lastName + "&background=random")
                    .reputationScore(new java.util.Random().nextInt(100))
                    .build();
            
            student = userRepository.save(student);
            newStudents.add(student);
            
            // Random date between June 1 and Aug 7 (approx 67 days)
            int randomDays = new java.util.Random().nextInt(67);
            int randomHours = new java.util.Random().nextInt(24);
            LocalDateTime randomDate = baseDate.plusDays(randomDays).plusHours(randomHours);
            
            // Assign to group
            com.educonnect.model.StudyGroup myGroup;
            Tag myTag;
            String myQuestionTitle;
            String myQuestionBody;
            String peerAnswerBody;
            String msgContent;

            int groupIndex = i % 3;
            if (groupIndex == 0) {
                myGroup = csGroup;
                myTag = mlTag;
                myQuestionTitle = csQuestions[i % csQuestions.length];
                myQuestionBody = "I've been studying this topic but I'm struggling to fully grasp the concepts. " + csQuestions[i % csQuestions.length];
                peerAnswerBody = csAnswers[i % csAnswers.length];
                msgContent = "Hey everyone! Glad to join the " + myGroup.getName() + " group. Looking forward to learning together!";
            } else if (groupIndex == 1) {
                myGroup = medGroup;
                myTag = medTag;
                myQuestionTitle = medQuestions[i % medQuestions.length];
                myQuestionBody = "Could someone clarify this for me? " + medQuestions[i % medQuestions.length];
                peerAnswerBody = medAnswers[i % medAnswers.length];
                msgContent = "Hi guys! I'm really interested in " + myGroup.getName() + " and hope to share some great resources.";
            } else {
                myGroup = mathGroup;
                myTag = mathTag;
                myQuestionTitle = mathQuestions[i % mathQuestions.length];
                myQuestionBody = "I have an upcoming exam and need help with this: " + mathQuestions[i % mathQuestions.length];
                peerAnswerBody = mathAnswers[i % mathAnswers.length];
                msgContent = "Hello! Mathematics is tough, so I'm hoping this group will be a big help!";
            }
            
            if (myGroup.getMembers() == null) {
                myGroup.setMembers(new java.util.HashSet<>());
            }
            myGroup.getMembers().add(student);
            studyGroupRepository.save(myGroup);
            
            GroupMessage msg = GroupMessage.builder()
                    .group(myGroup)
                    .author(student)
                    .content(msgContent)
                    .createdAt(randomDate)
                    .build();
            groupMessageRepository.save(msg);
            
            Question q = Question.builder()
                    .title(myQuestionTitle)
                    .body(myQuestionBody)
                    .author(student)
                    .voteCount(new java.util.Random().nextInt(20))
                    .createdAt(randomDate)
                    .build();
            q.getTags().add(myTag);
            q = questionRepository.save(q);
            
            // To simulate community, let the *previous* student in the same group answer it, if i >= 3
            if (i >= 3) {
                User peer = newStudents.get(i - 3);
                Answer a = Answer.builder()
                        .question(q)
                        .author(peer)
                        .body(peerAnswerBody)
                        .voteCount(new java.util.Random().nextInt(10))
                        .isAccepted(true)
                        .createdAt(randomDate.plusHours(2))
                        .build();
                answerRepository.save(a);
            }
        }
        System.out.println("Seeded 20 students with group-specific interconnected data (June-August timeline).");
    }

}
