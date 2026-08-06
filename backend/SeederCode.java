
    private void seedQuestionsAndAnswers() {
        System.out.println("Cleaning up existing questions, answers, and votes...");
        voteRepository.deleteAll();
        questionVoteRepository.deleteAll();
        answerRepository.deleteAll();
        questionRepository.deleteAll();

        System.out.println("Fetching users and tags...");
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) return;

        System.out.println("Seeding 20 high-quality questions...");
        List<Question> questionsToSave = new ArrayList<>();

        Question q0 = Question.builder()
                .title("How does FacultyLens handle diverse service contributions when calculating faculty workload?")
                .body("I understand that FacultyLens uses predictive analytics to balance teaching and research, but service contributions (like committees or advising) vary wildly in effort. Does the platform allow for custom weighting of different service activities, or does it use a standardized model?")
                .author(users.get(1 % users.size()))
                .voteCount(0)
                .viewCount(103)
                .createdAt(LocalDateTime.now().minusDays(7).minusHours(10))
                .build();
        
        List<Tag> tags0 = new ArrayList<>();

        tagRepository.findByName("machine-learning").ifPresent(tags0::add);

        tagRepository.findByName("business-analytics").ifPresent(tags0::add);

        tagRepository.findByName("management").ifPresent(tags0::add);

        q0.setTags(tags0);
        q0 = questionRepository.save(q0);

        Question q1 = Question.builder()
                .title("Is Bevinzey's summarization model fine-tuned on academic literature?")
                .body("I've tried using standard ChatGPT for summarizing dense biology papers, but it often hallucinates or misses key methodological details. Is Bevinzey's underlying LLM specifically fine-tuned for academic and scientific texts?")
                .author(users.get(2 % users.size()))
                .voteCount(0)
                .viewCount(232)
                .createdAt(LocalDateTime.now().minusDays(18).minusHours(12))
                .build();
        
        List<Tag> tags1 = new ArrayList<>();

        tagRepository.findByName("artificial-intelligence").ifPresent(tags1::add);

        tagRepository.findByName("nlp").ifPresent(tags1::add);

        tagRepository.findByName("biology").ifPresent(tags1::add);

        q1.setTags(tags1);
        q1 = questionRepository.save(q1);

        Question q2 = Question.builder()
                .title("What is G-Eval and how does Evalometrics implement it?")
                .body("I am looking into evaluating some custom LLMs we deployed for student advising. I keep seeing 'G-Eval' mentioned in the Evalometrics documentation. Can someone explain how it differs from traditional ROUGE or BLEU scores?")
                .author(users.get(4 % users.size()))
                .voteCount(0)
                .viewCount(108)
                .createdAt(LocalDateTime.now().minusDays(22).minusHours(2))
                .build();
        
        List<Tag> tags2 = new ArrayList<>();

        tagRepository.findByName("deep-learning").ifPresent(tags2::add);

        tagRepository.findByName("nlp").ifPresent(tags2::add);

        tagRepository.findByName("artificial-intelligence").ifPresent(tags2::add);

        q2.setTags(tags2);
        q2 = questionRepository.save(q2);

        Question q3 = Question.builder()
                .title("Integrating StudySocius with external calendar apps (Google Calendar/Outlook)?")
                .body("StudySocius has been amazing for keeping my assignment streaks alive. However, I want to sync my study blocks directly to Google Calendar. Is there a two-way sync available currently?")
                .author(users.get(5 % users.size()))
                .voteCount(0)
                .viewCount(53)
                .createdAt(LocalDateTime.now().minusDays(19).minusHours(9))
                .build();
        
        List<Tag> tags3 = new ArrayList<>();

        tagRepository.findByName("software-engineering").ifPresent(tags3::add);

        tagRepository.findByName("javascript").ifPresent(tags3::add);

        q3.setTags(tags3);
        q3 = questionRepository.save(q3);

        Question q4 = Question.builder()
                .title("Best RxCalculations modules for mastering parenteral nutrition formulas?")
                .body("I am struggling with the parenteral nutrition (TPN) calculations for my upcoming NAPLEX. Which specific video tutorials or question banks in RxCalculations are best for this?")
                .author(users.get(3 % users.size()))
                .voteCount(0)
                .viewCount(192)
                .createdAt(LocalDateTime.now().minusDays(20).minusHours(3))
                .build();
        
        List<Tag> tags4 = new ArrayList<>();

        tagRepository.findByName("pharmacology").ifPresent(tags4::add);

        tagRepository.findByName("medicine").ifPresent(tags4::add);

        tagRepository.findByName("clinical-skills").ifPresent(tags4::add);

        q4.setTags(tags4);
        q4 = questionRepository.save(q4);

        Question q5 = Question.builder()
                .title("How does Eduscope Connect prevent cheating when using AI tutors?")
                .body("With tools like Bevinzey generating answers, how do educators ensure that students are actually learning the material and not just copy-pasting AI outputs for their assignments?")
                .author(users.get(1 % users.size()))
                .voteCount(0)
                .viewCount(83)
                .createdAt(LocalDateTime.now().minusDays(2).minusHours(7))
                .build();
        
        List<Tag> tags5 = new ArrayList<>();

        tagRepository.findByName("ethics").ifPresent(tags5::add);

        tagRepository.findByName("artificial-intelligence").ifPresent(tags5::add);

        tagRepository.findByName("education").ifPresent(tags5::add);

        q5.setTags(tags5);
        q5 = questionRepository.save(q5);

        Question q6 = Question.builder()
                .title("Can Evalometrics run entirely on-premise for data privacy?")
                .body("Our university has strict data privacy laws (FERPA compliance) and we cannot send student interaction data to OpenAI or Anthropic APIs. Can Evalometrics be configured to use local open-source models (like Llama 3) for its evaluation metrics?")
                .author(users.get(4 % users.size()))
                .voteCount(0)
                .viewCount(488)
                .createdAt(LocalDateTime.now().minusDays(5).minusHours(6))
                .build();
        
        List<Tag> tags6 = new ArrayList<>();

        tagRepository.findByName("security").ifPresent(tags6::add);

        tagRepository.findByName("privacy").ifPresent(tags6::add);

        tagRepository.findByName("artificial-intelligence").ifPresent(tags6::add);

        q6.setTags(tags6);
        q6 = questionRepository.save(q6);

        Question q7 = Question.builder()
                .title("StudySocius: How is the 'Productivity Score' calculated?")
                .body("My StudySocius productivity score dropped slightly over the weekend even though I completed all my tasks. What factors go into this calculation? Does it penalize taking rest days?")
                .author(users.get(5 % users.size()))
                .voteCount(0)
                .viewCount(329)
                .createdAt(LocalDateTime.now().minusDays(17).minusHours(20))
                .build();
        
        List<Tag> tags7 = new ArrayList<>();

        tagRepository.findByName("algorithms").ifPresent(tags7::add);

        tagRepository.findByName("data-analysis").ifPresent(tags7::add);

        q7.setTags(tags7);
        q7 = questionRepository.save(q7);

        Question q8 = Question.builder()
                .title("Is FacultyLens suitable for small liberal arts colleges?")
                .body("Our institution only has about 150 faculty members. The predictive models in FacultyLens seem geared towards massive R1 research universities. Does the AI perform well with smaller datasets?")
                .author(users.get(1 % users.size()))
                .voteCount(0)
                .viewCount(313)
                .createdAt(LocalDateTime.now().minusDays(18).minusHours(4))
                .build();
        
        List<Tag> tags8 = new ArrayList<>();

        tagRepository.findByName("machine-learning").ifPresent(tags8::add);

        tagRepository.findByName("statistics").ifPresent(tags8::add);

        q8.setTags(tags8);
        q8 = questionRepository.save(q8);

        Question q9 = Question.builder()
                .title("Accuracy of Bevinzey's auto-generated Flashcards for Medical students")
                .body("I'm a med student considering using Bevinzey to automatically generate Anki flashcards from my lecture PDFs. Has anyone tested its accuracy for dense medical topics like neuroanatomy?")
                .author(users.get(3 % users.size()))
                .voteCount(0)
                .viewCount(467)
                .createdAt(LocalDateTime.now().minusDays(17).minusHours(22))
                .build();
        
        List<Tag> tags9 = new ArrayList<>();

        tagRepository.findByName("anatomy").ifPresent(tags9::add);

        tagRepository.findByName("neuroscience").ifPresent(tags9::add);

        tagRepository.findByName("medicine").ifPresent(tags9::add);

        q9.setTags(tags9);
        q9 = questionRepository.save(q9);

        Question q10 = Question.builder()
                .title("RxCalculations: Differences between Alligation and Algebraic methods?")
                .body("I constantly get confused when mixing two different strengths of a compound. Does RxCalculations teach both the alligation alternate method and the standard algebraic method?")
                .author(users.get(2 % users.size()))
                .voteCount(0)
                .viewCount(195)
                .createdAt(LocalDateTime.now().minusDays(29).minusHours(21))
                .build();
        
        List<Tag> tags10 = new ArrayList<>();

        tagRepository.findByName("pharmacology").ifPresent(tags10::add);

        tagRepository.findByName("chemistry").ifPresent(tags10::add);

        q10.setTags(tags10);
        q10 = questionRepository.save(q10);

        Question q11 = Question.builder()
                .title("Setting up custom metrics in Evalometrics for conversational agents")
                .body("I want to evaluate a student-support chatbot. In addition to accuracy, I want to measure 'empathy' and 'tone'. How easy is it to define these custom metrics in Evalometrics?")
                .author(users.get(4 % users.size()))
                .voteCount(0)
                .viewCount(455)
                .createdAt(LocalDateTime.now().minusDays(14).minusHours(13))
                .build();
        
        List<Tag> tags11 = new ArrayList<>();

        tagRepository.findByName("nlp").ifPresent(tags11::add);

        tagRepository.findByName("artificial-intelligence").ifPresent(tags11::add);

        q11.setTags(tags11);
        q11 = questionRepository.save(q11);

        Question q12 = Question.builder()
                .title("How to handle conflicting research paradigms in Bevinzey Q&A?")
                .body("If I upload two papers that directly contradict each other, how does Bevinzey's Q&A generation handle the discrepancy? Does it hallucinate a middle ground, or point out the conflict?")
                .author(users.get(2 % users.size()))
                .voteCount(0)
                .viewCount(234)
                .createdAt(LocalDateTime.now().minusDays(21).minusHours(5))
                .build();
        
        List<Tag> tags12 = new ArrayList<>();

        tagRepository.findByName("research").ifPresent(tags12::add);

        tagRepository.findByName("artificial-intelligence").ifPresent(tags12::add);

        tagRepository.findByName("deep-learning").ifPresent(tags12::add);

        q12.setTags(tags12);
        q12 = questionRepository.save(q12);

        Question q13 = Question.builder()
                .title("FacultyLens: Can faculty view their own predictive analytics?")
                .body("Transparency is a big issue at our university. If department chairs are using FacultyLens to assign workloads, do individual faculty members get a dashboard to see their own metrics and predictions?")
                .author(users.get(1 % users.size()))
                .voteCount(0)
                .viewCount(61)
                .createdAt(LocalDateTime.now().minusDays(17).minusHours(11))
                .build();
        
        List<Tag> tags13 = new ArrayList<>();

        tagRepository.findByName("management").ifPresent(tags13::add);

        tagRepository.findByName("human-resources").ifPresent(tags13::add);

        q13.setTags(tags13);
        q13 = questionRepository.save(q13);

        Question q14 = Question.builder()
                .title("Gamification features in StudySocius?")
                .body("I'm trying to convince my study group to switch to StudySocius. Besides task tracking, what gamification features does it have to keep people motivated?")
                .author(users.get(5 % users.size()))
                .voteCount(0)
                .viewCount(154)
                .createdAt(LocalDateTime.now().minusDays(24).minusHours(8))
                .build();
        
        List<Tag> tags14 = new ArrayList<>();

        tagRepository.findByName("software-engineering").ifPresent(tags14::add);

        tagRepository.findByName("psychology").ifPresent(tags14::add);

        q14.setTags(tags14);
        q14 = questionRepository.save(q14);

        Question q15 = Question.builder()
                .title("Using RxCalculations for Nursing (NCLEX) instead of Pharmacy (NAPLEX)?")
                .body("I know RxCalculations is geared towards pharmacy students, but I am in nursing school studying for the NCLEX. Would the dosage calculation modules be overkill, or still useful for me?")
                .author(users.get(3 % users.size()))
                .voteCount(0)
                .viewCount(446)
                .createdAt(LocalDateTime.now().minusDays(17).minusHours(22))
                .build();
        
        List<Tag> tags15 = new ArrayList<>();

        tagRepository.findByName("nursing").ifPresent(tags15::add);

        tagRepository.findByName("pharmacology").ifPresent(tags15::add);

        tagRepository.findByName("medicine").ifPresent(tags15::add);

        q15.setTags(tags15);
        q15 = questionRepository.save(q15);

        Question q16 = Question.builder()
                .title("Evalometrics: Integrating with CI/CD pipelines?")
                .body("We want to run LLM evaluations automatically every time we push a prompt update to GitHub. Does Evalometrics have integrations for GitHub Actions or Jenkins?")
                .author(users.get(4 % users.size()))
                .voteCount(0)
                .viewCount(311)
                .createdAt(LocalDateTime.now().minusDays(26).minusHours(5))
                .build();
        
        List<Tag> tags16 = new ArrayList<>();

        tagRepository.findByName("github-actions").ifPresent(tags16::add);

        tagRepository.findByName("jenkins").ifPresent(tags16::add);

        tagRepository.findByName("devops").ifPresent(tags16::add);

        q16.setTags(tags16);
        q16 = questionRepository.save(q16);

        Question q17 = Question.builder()
                .title("Bevinzey: Exporting summaries to Notion or Obsidian?")
                .body("I use Obsidian for my 'Second Brain'. Is there a seamless way to export the Markdown summaries and Q&A pairs generated by Bevinzey directly into Obsidian or Notion?")
                .author(users.get(5 % users.size()))
                .voteCount(0)
                .viewCount(70)
                .createdAt(LocalDateTime.now().minusDays(27).minusHours(5))
                .build();
        
        List<Tag> tags17 = new ArrayList<>();

        tagRepository.findByName("software-engineering").ifPresent(tags17::add);

        tagRepository.findByName("productivity").ifPresent(tags17::add);

        q17.setTags(tags17);
        q17 = questionRepository.save(q17);

        Question q18 = Question.builder()
                .title("How does Eduscope ensure AI models remain unbiased in grading?")
                .body("When using AI tools in the EduScope ecosystem to assist with grading or evaluating student input, how do you mitigate algorithmic bias against non-native English speakers?")
                .author(users.get(1 % users.size()))
                .voteCount(0)
                .viewCount(210)
                .createdAt(LocalDateTime.now().minusDays(11).minusHours(23))
                .build();
        
        List<Tag> tags18 = new ArrayList<>();

        tagRepository.findByName("ethics").ifPresent(tags18::add);

        tagRepository.findByName("artificial-intelligence").ifPresent(tags18::add);

        tagRepository.findByName("linguistics").ifPresent(tags18::add);

        q18.setTags(tags18);
        q18 = questionRepository.save(q18);

        Question q19 = Question.builder()
                .title("FacultyLens: Data integration with Canvas LMS?")
                .body("Can FacultyLens automatically pull teaching workload data (like number of students, assignments graded) directly from Canvas or Blackboard via API?")
                .author(users.get(2 % users.size()))
                .voteCount(0)
                .viewCount(211)
                .createdAt(LocalDateTime.now().minusDays(15).minusHours(23))
                .build();
        
        List<Tag> tags19 = new ArrayList<>();

        tagRepository.findByName("software-engineering").ifPresent(tags19::add);

        tagRepository.findByName("api").ifPresent(tags19::add);

        tagRepository.findByName("education").ifPresent(tags19::add);

        q19.setTags(tags19);
        q19 = questionRepository.save(q19);

        System.out.println("Seeding answers and generating votes...");

        Answer a_0_0 = Answer.builder()
                .body("Great question! FacultyLens allows institutional admins to set custom 'weightings' for different types of service. The AI model then uses these weights alongside historical data to predict the actual time commitment required for each role, preventing burnout.")
                .author(users.get(0 % users.size()))
                .question(q0)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q0.getCreatedAt().plusHours(10))
                .build();
        a_0_0 = answerRepository.save(a_0_0);

        for(int k=0; k<12; k++) {
            Vote v = Vote.builder()
                    .answer(a_0_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_0_0.setVoteCount(12);
        answerRepository.save(a_0_0);

        for(int k=0; k<8; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q0.setVoteCount(8);
        questionRepository.save(q0);

        Answer a_1_0 = Answer.builder()
                .body("Yes! Bevinzey employs a specialized Retrieval-Augmented Generation (RAG) architecture that is heavily fine-tuned on peer-reviewed academic corpora. This significantly reduces hallucinations, especially in STEM fields, by grounding the summaries in the actual uploaded text.")
                .author(users.get(0 % users.size()))
                .question(q1)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q1.getCreatedAt().plusHours(3))
                .build();
        a_1_0 = answerRepository.save(a_1_0);

        for(int k=0; k<25; k++) {
            Vote v = Vote.builder()
                    .answer(a_1_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_1_0.setVoteCount(25);
        answerRepository.save(a_1_0);

        Answer a_1_1 = Answer.builder()
                .body("I've been using it for my biochemistry post-doc. The difference is night and day compared to generic models. It actually understands standard assay abbreviations.")
                .author(users.get(3 % users.size()))
                .question(q1)
                .isAccepted(false)
                .voteCount(0)
                .createdAt(q1.getCreatedAt().plusHours(9))
                .build();
        a_1_1 = answerRepository.save(a_1_1);

        for(int k=0; k<10; k++) {
            Vote v = Vote.builder()
                    .answer(a_1_1)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_1_1.setVoteCount(10);
        answerRepository.save(a_1_1);

        for(int k=0; k<15; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q1)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q1.setVoteCount(15);
        questionRepository.save(q1);

        Answer a_2_0 = Answer.builder()
                .body("Traditional metrics like BLEU only check for n-gram overlap between the generated text and a reference. G-Eval, which Evalometrics natively supports, uses an LLM itself to evaluate the output based on a specific rubric (like coherence, relevance, or empathy). It correlates much better with human judgment!")
                .author(users.get(0 % users.size()))
                .question(q2)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q2.getCreatedAt().plusHours(4))
                .build();
        a_2_0 = answerRepository.save(a_2_0);

        for(int k=0; k<30; k++) {
            Vote v = Vote.builder()
                    .answer(a_2_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_2_0.setVoteCount(30);
        answerRepository.save(a_2_0);

        for(int k=0; k<22; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q2)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q2.setVoteCount(22);
        questionRepository.save(q2);

        Answer a_3_0 = Answer.builder()
                .body("Currently, StudySocius supports one-way sync (exporting an iCal feed that you can subscribe to in Google Calendar). Two-way sync is on the roadmap for Q3!")
                .author(users.get(1 % users.size()))
                .question(q3)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q3.getCreatedAt().plusHours(7))
                .build();
        a_3_0 = answerRepository.save(a_3_0);

        for(int k=0; k<5; k++) {
            Vote v = Vote.builder()
                    .answer(a_3_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_3_0.setVoteCount(5);
        answerRepository.save(a_3_0);

        for(int k=0; k<10; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q3)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q3.setVoteCount(10);
        questionRepository.save(q3);

        Answer a_4_0 = Answer.builder()
                .body("Focus on Module 7 in the RxCalculations Video Course. It breaks down the macronutrient calories (dextrose, amino acids, lipids) step-by-step. Also, filter the Question Bank by 'TPN' and do at least 50 practice questions. The detailed rationales really help.")
                .author(users.get(2 % users.size()))
                .question(q4)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q4.getCreatedAt().plusHours(7))
                .build();
        a_4_0 = answerRepository.save(a_4_0);

        for(int k=0; k<18; k++) {
            Vote v = Vote.builder()
                    .answer(a_4_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_4_0.setVoteCount(18);
        answerRepository.save(a_4_0);

        for(int k=0; k<14; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q4)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q4.setVoteCount(14);
        questionRepository.save(q4);

        Answer a_5_0 = Answer.builder()
                .body("Eduscope platforms are designed with 'Socratic Mode' as the default for students. Instead of giving the direct answer, the AI tutor asks guiding questions to help the student arrive at the conclusion themselves. Furthermore, educators have access to analytics showing how the student interacted with the AI.")
                .author(users.get(0 % users.size()))
                .question(q5)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q5.getCreatedAt().plusHours(10))
                .build();
        a_5_0 = answerRepository.save(a_5_0);

        for(int k=0; k<45; k++) {
            Vote v = Vote.builder()
                    .answer(a_5_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_5_0.setVoteCount(45);
        answerRepository.save(a_5_0);

        for(int k=0; k<35; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q5)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q5.setVoteCount(35);
        questionRepository.save(q5);

        Answer a_6_0 = Answer.builder()
                .body("Yes! Evalometrics is highly modular. You can swap out the default evaluator LLM (GPT-4) with any local model hosted via vLLM or Ollama. Just update your config to point the base_url to your local inference server.")
                .author(users.get(0 % users.size()))
                .question(q6)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q6.getCreatedAt().plusHours(11))
                .build();
        a_6_0 = answerRepository.save(a_6_0);

        for(int k=0; k<20; k++) {
            Vote v = Vote.builder()
                    .answer(a_6_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_6_0.setVoteCount(20);
        answerRepository.save(a_6_0);

        for(int k=0; k<18; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q6)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q6.setVoteCount(18);
        questionRepository.save(q6);

        Answer a_7_0 = Answer.builder()
                .body("The productivity score factors in task completion, focus session duration (Pomodoro), and streak consistency. However, you can designate 'Rest Days' in your settings. If you don't mark the weekend as a Rest Day, the algorithm expects a baseline of activity. Update your schedule in Settings > Weekly Routine!")
                .author(users.get(1 % users.size()))
                .question(q7)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q7.getCreatedAt().plusHours(8))
                .build();
        a_7_0 = answerRepository.save(a_7_0);

        for(int k=0; k<15; k++) {
            Vote v = Vote.builder()
                    .answer(a_7_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_7_0.setVoteCount(15);
        answerRepository.save(a_7_0);

        for(int k=0; k<12; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q7)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q7.setVoteCount(12);
        questionRepository.save(q7);

        Answer a_8_0 = Answer.builder()
                .body("While R1 universities generate more data, FacultyLens uses transfer learning from a generalized model fine-tuned on aggregated, anonymized higher-ed data. This means it works excellently 'out of the box' for smaller colleges, adapting to your specific institutional norms within a few weeks of data input.")
                .author(users.get(0 % users.size()))
                .question(q8)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q8.getCreatedAt().plusHours(1))
                .build();
        a_8_0 = answerRepository.save(a_8_0);

        for(int k=0; k<22; k++) {
            Vote v = Vote.builder()
                    .answer(a_8_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_8_0.setVoteCount(22);
        answerRepository.save(a_8_0);

        for(int k=0; k<19; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q8)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q8.setVoteCount(19);
        questionRepository.save(q8);

        Answer a_9_0 = Answer.builder()
                .body("It's surprisingly accurate! It uses an NLP technique called entity extraction to pull out key terms, definitions, and relationships. I always review the generated cards before importing them to Anki, but it saves me about 80% of the time I used to spend making them manually.")
                .author(users.get(2 % users.size()))
                .question(q9)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q9.getCreatedAt().plusHours(3))
                .build();
        a_9_0 = answerRepository.save(a_9_0);

        for(int k=0; k<40; k++) {
            Vote v = Vote.builder()
                    .answer(a_9_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_9_0.setVoteCount(40);
        answerRepository.save(a_9_0);

        for(int k=0; k<28; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q9)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q9.setVoteCount(28);
        questionRepository.save(q9);

        Answer a_10_0 = Answer.builder()
                .body("Yes, RxCalculations covers both! In the 'Compounding Calculations' module, every practice question solution shows the step-by-step breakdown using BOTH the alligation grid and the algebraic equation, so you can use whichever method clicks best for your brain.")
                .author(users.get(3 % users.size()))
                .question(q10)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q10.getCreatedAt().plusHours(7))
                .build();
        a_10_0 = answerRepository.save(a_10_0);

        for(int k=0; k<12; k++) {
            Vote v = Vote.builder()
                    .answer(a_10_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_10_0.setVoteCount(12);
        answerRepository.save(a_10_0);

        for(int k=0; k<9; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q10)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q10.setVoteCount(9);
        questionRepository.save(q10);

        Answer a_11_0 = Answer.builder()
                .body("It's very straightforward. You define a `CustomCriterion` in Evalometrics by passing a descriptive string of what 'empathy' means in your context. The framework then uses LLM-as-a-judge to score the chatbot's responses against your definition on a scale of 0 to 1.")
                .author(users.get(0 % users.size()))
                .question(q11)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q11.getCreatedAt().plusHours(9))
                .build();
        a_11_0 = answerRepository.save(a_11_0);

        for(int k=0; k<16; k++) {
            Vote v = Vote.builder()
                    .answer(a_11_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_11_0.setVoteCount(16);
        answerRepository.save(a_11_0);

        for(int k=0; k<15; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q11)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q11.setVoteCount(15);
        questionRepository.save(q11);

        Answer a_12_0 = Answer.builder()
                .body("Bevinzey's RAG system is built with 'contrastive reasoning' capabilities. When generating answers, if it retrieves conflicting facts from the source documents, it explicitly states: 'Source A suggests X, however, Source B argues Y.' It doesn't attempt to hallucinate a false consensus.")
                .author(users.get(0 % users.size()))
                .question(q12)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q12.getCreatedAt().plusHours(4))
                .build();
        a_12_0 = answerRepository.save(a_12_0);

        for(int k=0; k<35; k++) {
            Vote v = Vote.builder()
                    .answer(a_12_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_12_0.setVoteCount(35);
        answerRepository.save(a_12_0);

        for(int k=0; k<25; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q12)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q12.setVoteCount(25);
        questionRepository.save(q12);

        Answer a_13_0 = Answer.builder()
                .body("Absolutely. FacultyLens features a role-based access control (RBAC) system. Faculty members have their own 'Personal Workload Dashboard' where they can see their current distributions, historical data, and how their workload aligns with departmental averages.")
                .author(users.get(0 % users.size()))
                .question(q13)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q13.getCreatedAt().plusHours(1))
                .build();
        a_13_0 = answerRepository.save(a_13_0);

        for(int k=0; k<28; k++) {
            Vote v = Vote.builder()
                    .answer(a_13_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_13_0.setVoteCount(28);
        answerRepository.save(a_13_0);

        for(int k=0; k<20; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q13)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q13.setVoteCount(20);
        questionRepository.save(q13);

        Answer a_14_0 = Answer.builder()
                .body("StudySocius has a fantastic 'Group Leaderboard' where you earn XP for completing tasks, finishing Pomodoro sessions, and sharing study resources. You can also unlock badges (like 'Early Bird' for studying before 7 AM) and compete in weekly group challenges!")
                .author(users.get(1 % users.size()))
                .question(q14)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q14.getCreatedAt().plusHours(3))
                .build();
        a_14_0 = answerRepository.save(a_14_0);

        for(int k=0; k<18; k++) {
            Vote v = Vote.builder()
                    .answer(a_14_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_14_0.setVoteCount(18);
        answerRepository.save(a_14_0);

        for(int k=0; k<14; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q14)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q14.setVoteCount(14);
        questionRepository.save(q14);

        Answer a_15_0 = Answer.builder()
                .body("While some advanced modules (like complex compounding or pharmacokinetics) might be beyond the scope of the NCLEX, the core modules on dimensional analysis, weight-based dosing, and IV drip rates are universally applicable and highly recommended for nursing students wanting to master the math.")
                .author(users.get(2 % users.size()))
                .question(q15)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q15.getCreatedAt().plusHours(4))
                .build();
        a_15_0 = answerRepository.save(a_15_0);

        for(int k=0; k<25; k++) {
            Vote v = Vote.builder()
                    .answer(a_15_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_15_0.setVoteCount(25);
        answerRepository.save(a_15_0);

        for(int k=0; k<22; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q15)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q15.setVoteCount(22);
        questionRepository.save(q15);

        Answer a_16_0 = Answer.builder()
                .body("Yes, Evalometrics is designed for CI/CD. It exports results in standard JUnit XML or JSON formats. You can set failure thresholds (e.g., 'Fail build if AnswerRelevancy < 0.8') directly in your GitHub Actions YAML file.")
                .author(users.get(0 % users.size()))
                .question(q16)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q16.getCreatedAt().plusHours(11))
                .build();
        a_16_0 = answerRepository.save(a_16_0);

        for(int k=0; k<32; k++) {
            Vote v = Vote.builder()
                    .answer(a_16_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_16_0.setVoteCount(32);
        answerRepository.save(a_16_0);

        for(int k=0; k<27; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q16)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q16.setVoteCount(27);
        questionRepository.save(q16);

        Answer a_17_0 = Answer.builder()
                .body("Bevinzey has a 1-click 'Copy as Markdown' button which works perfectly for Obsidian. There is also a direct Notion integration in beta right now—you just link your Notion workspace in the Bevinzey settings and it creates a new page in your designated database.")
                .author(users.get(1 % users.size()))
                .question(q17)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q17.getCreatedAt().plusHours(2))
                .build();
        a_17_0 = answerRepository.save(a_17_0);

        for(int k=0; k<22; k++) {
            Vote v = Vote.builder()
                    .answer(a_17_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_17_0.setVoteCount(22);
        answerRepository.save(a_17_0);

        for(int k=0; k<18; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q17)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q17.setVoteCount(18);
        questionRepository.save(q17);

        Answer a_18_0 = Answer.builder()
                .body("This is a critical priority. Eduscope uses Evalometrics internally to continuously run fairness and bias benchmarks on all grading models. We specifically test against datasets featuring diverse dialects, grammar structures, and ESL patterns to ensure the AI evaluates the core logic/knowledge, not just grammatical perfection.")
                .author(users.get(0 % users.size()))
                .question(q18)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q18.getCreatedAt().plusHours(2))
                .build();
        a_18_0 = answerRepository.save(a_18_0);

        for(int k=0; k<55; k++) {
            Vote v = Vote.builder()
                    .answer(a_18_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_18_0.setVoteCount(55);
        answerRepository.save(a_18_0);

        for(int k=0; k<42; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q18)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q18.setVoteCount(42);
        questionRepository.save(q18);

        Answer a_19_0 = Answer.builder()
                .body("Yes, FacultyLens supports LTI 1.3 integrations and direct REST API syncing with Canvas, Blackboard, and Moodle. It automatically ingests enrollment numbers, grading volume, and course credit hours to keep the workload dashboard updated in real-time.")
                .author(users.get(0 % users.size()))
                .question(q19)
                .isAccepted(true)
                .voteCount(0)
                .createdAt(q19.getCreatedAt().plusHours(12))
                .build();
        a_19_0 = answerRepository.save(a_19_0);

        for(int k=0; k<28; k++) {
            Vote v = Vote.builder()
                    .answer(a_19_0)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            voteRepository.save(v);
        }
        a_19_0.setVoteCount(28);
        answerRepository.save(a_19_0);

        for(int k=0; k<21; k++) {
            QuestionVote qv = QuestionVote.builder()
                    .question(q19)
                    .user(users.get(k % users.size()))
                    .voteType(VoteType.UP)
                    .build();
            questionVoteRepository.save(qv);
        }
        q19.setVoteCount(21);
        questionRepository.save(q19);

        // Final Reputation update pass (optional, but good for consistency)
        for (User u : users) {
            int rep = 0;
            // Calculate rep from answers
            // ... omitting for brevity, they have base rep ...
        }
        System.out.println("Finished seeding questions, answers, and interactions!");
    }
