export const COURSE_CATEGORIES = [
  { id: "all", name: "All Modules" },
  { id: "core-dsa", name: "Core Java & DSA" },
  { id: "build-testing", name: "Build Tools & QA" },
  { id: "web-orm", name: "Web & Persistence" },
  { id: "spring-boot", name: "Spring Boot Ecosystem" },
  { id: "security-auth", name: "Security & Auth" },
  { id: "devops-cloud", name: "DevOps & Cloud" },
  { id: "microservices-kafka", name: "Microservices & Kafka" },
  { id: "spring-ai", name: "Spring AI & LLMs" },
];

export const JAVA_MODULES = [
  // 1. Core Java
  {
    id: "mod-1",
    moduleNumber: 1,
    title: "Core Java (Java 21 LTS)",
    slug: "core-java",
    category: "Core Java & DSA",
    categoryId: "core-dsa",
    videoTimestamp: "13:32:51",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=48771s",
    description: "Deep dive into OOP, JVM memory model, garbage collection, switch expressions, records, and virtual threads.",
    lessonsCount: 3,
    xpReward: 250,
    difficulty: "Beginner to Intermediate",
    estimatedMinutes: 45,
    lessons: [
      {
        id: "lesson-1-1",
        title: "OOP, Records & Pattern Matching in Java 21",
        description: "Master records, sealed classes, switch pattern matching, and memory layouts.",
        duration: "15 min",
        quizId: "quiz-1-1",
        videoTimestamp: "13:32:51",
        concept: `Modern Java (Java 17 to 21 LTS) introduces powerful language features that modernize object-oriented programming:

1. **Records**: Immutable data carriers that automatically generate constructors, accessors, \`equals()\`, \`hashCode()\`, and \`toString()\`.
2. **Sealed Classes & Interfaces**: Restrict which classes can extend or implement them using the \`permits\` clause.
3. **Pattern Matching for switch**: Simplifies type inspection and extraction without verbose \`instanceof\` chains.
4. **Virtual Threads (Project Loom)**: Lightweight threads managed by the JVM rather than 1-to-1 OS kernel threads.`,
        keyPoints: [
          "Records replace verbose POJO boilerplate with a single line: record User(String id, String email) {}",
          "Sealed interfaces enforce domain boundaries: sealed interface Payment permits CreditCard, Crypto, UPI {}",
          "Virtual threads enable high-throughput server architectures with millions of concurrent tasks."
        ],
        codeExample: {
          filename: "ModernJavaDemo.java",
          code: `sealed interface Status permits Active, Suspended {}
record Active(String reason) implements Status {}
record Suspended(int daysRemaining) implements Status {}

public class ModernJavaDemo {
    public static String inspectStatus(Status status) {
        return switch (status) {
            case Active a -> "Active account: " + a.reason();
            case Suspended s when s.daysRemaining() > 30 -> "Long-term suspension: " + s.daysRemaining() + " days";
            case Suspended s -> "Temporary suspension: " + s.daysRemaining() + " days";
        };
    }

    public static void main(String[] args) {
        Status userStatus = new Suspended(45);
        System.out.println(inspectStatus(userStatus));
    }
}`,
          output: `Long-term suspension: 45 days`
        },
        notes: [
          "Records cannot extend other classes because they already implicitly extend java.lang.Record, but they can implement interfaces."
        ],
        commonMistakes: [
          {
            title: "Attempting to declare mutable fields in records",
            desc: "All record header components are implicitly final. You cannot declare non-static mutable fields inside a record body."
          }
        ],
        tryIt: {
          prompt: "Verify pattern matching exhaustiveness in modern switch:",
          code: `Object obj = "DevHub";\nString res = switch(obj) {\n    case String s -> "String of len " + s.length();\n    case Integer i -> "Int: " + i;\n    default -> "Unknown";\n};`,
          hint: "Pattern matching extracts the typed variable 's' directly without explicit casting."
        }
      },
      {
        id: "lesson-1-2",
        title: "JVM Memory Model & Virtual Threads",
        description: "Understand Heap, Metaspace, Stack frames, and Project Loom Virtual Threads.",
        duration: "15 min",
        quizId: "quiz-1-2",
        concept: `Java 21 introduces **Virtual Threads** to revolutionize I/O-bound enterprise applications:

- **Platform Threads**: Wraps an underlying OS kernel thread (1MB stack memory per thread). Costly to allocate.
- **Virtual Threads**: JVM-managed lightweight threads (~few hundred bytes). The JVM mounts virtual threads onto carrier platform threads and unmounts them when blocking on I/O.`,
        keyPoints: [
          "Executors.newVirtualThreadPerTaskExecutor() spawns a new virtual thread for each submitted task.",
          "Ideal for HTTP microservices, database transactions, and network calls waiting on I/O."
        ],
        codeExample: {
          filename: "VirtualThreadsDemo.java",
          code: `import java.util.concurrent.*;

public class VirtualThreadsDemo {
    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= 5; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    System.out.println("Running task " + taskId + " on " + Thread.currentThread());
                });
            }
        }
    }
}`,
          output: `Running task 1 on VirtualThread[#21]/runnable@ForkJoinPool-1-worker-1\nRunning task 2 on VirtualThread[#22]/runnable@ForkJoinPool-1-worker-2`
        },
        notes: ["Avoid thread pooling virtual threads; create them fresh per task."],
        commonMistakes: [{ title: "Using Virtual Threads for CPU-intensive hashing", desc: "Virtual threads excel at I/O blocking, not heavy CPU computation." }],
        tryIt: { prompt: "Create a virtual thread directly:", code: `Thread.startVirtualThread(() -> System.out.println("Hello from Virtual Thread"));`, hint: "startVirtualThread runs immediately without thread pool overhead." }
      }
    ]
  },

  // 2. Maven
  {
    id: "mod-2",
    moduleNumber: 2,
    title: "Maven Build Tool",
    slug: "maven",
    category: "Build Tools & QA",
    categoryId: "build-testing",
    videoTimestamp: "15:42:13",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=56533s",
    description: "POM.xml architecture, dependency management, scopes (compile, test, provided), and Maven build lifecycles.",
    lessonsCount: 2,
    xpReward: 200,
    difficulty: "Beginner",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-2-1",
        title: "Maven Lifecycles & POM.xml Structure",
        description: "Master validate, compile, test, package, verify, install, deploy, and dependency scopes.",
        duration: "15 min",
        quizId: "quiz-2-1",
        videoTimestamp: "15:42:13",
        concept: `Apache Maven is the standard declarative build automation tool for Java projects.

Every Maven project is centered around a \`pom.xml\` (Project Object Model) defining:
1. **GAV Coordinates**: \`groupId\`, \`artifactId\`, \`version\`.
2. **Dependencies & Scopes**:
   - \`compile\` (default, available on all classpaths)
   - \`test\` (only during unit tests, e.g. JUnit, Mockito)
   - \`provided\` (provided by runtime container, e.g. Servlet API, Lombok)
   - \`runtime\` (needed only during execution, e.g. JDBC database drivers)
3. **Standard Lifecycles**: Clean, Default (validate -> compile -> test -> package -> install -> deploy), Site.`,
        keyPoints: [
          "mvn clean package: Deletes target directory, runs test suite, and compiles a JAR/WAR.",
          "Transitive dependencies are automatically resolved from Maven Central repo into ~/.m2/repository."
        ],
        codeExample: {
          filename: "pom.xml",
          code: `<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.devhub</groupId>
    <artifactId>order-service</artifactId>
    <version>1.0.0</version>

    <dependencies>
        <!-- Compile scope default -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.2.3</version>
        </dependency>
        <!-- Test scope -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>`,
          output: `[INFO] Building order-service 1.0.0\n[INFO] BUILD SUCCESS`
        },
        notes: ["Use <dependencyManagement> in parent POMs to control dependency versions across multi-module projects."],
        commonMistakes: [{ title: "Packaging test dependencies into production JARs", desc: "Omitting <scope>test</scope> bundles testing libraries into your production distribution." }],
        tryIt: { prompt: "What command skips unit tests during package?", code: `mvn clean package -DskipTests`, hint: "-DskipTests compiles test classes but skips running them." }
      }
    ]
  },

  // 3. Gradle
  {
    id: "mod-3",
    moduleNumber: 3,
    title: "Gradle Build Automation",
    slug: "gradle",
    category: "Build Tools & QA",
    categoryId: "build-testing",
    videoTimestamp: "16:13:17",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=58397s",
    description: "Groovy & Kotlin DSL, build.gradle, task graphs, incremental compilation, and dependency configurations.",
    lessonsCount: 2,
    xpReward: 200,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-3-1",
        title: "Gradle Kotlin DSL & Task Execution",
        description: "Understand build.gradle.kts, implementation vs api, and incremental build cache.",
        duration: "15 min",
        quizId: "quiz-3-1",
        videoTimestamp: "16:13:17",
        concept: `Gradle is a high-performance build automation tool that uses a Directed Acyclic Graph (DAG) of tasks.

Key features:
- **Build Cache & Incremental Builds**: If inputs and outputs have not changed, Gradle marks tasks as \`UP-TO-DATE\` and skips redundant execution.
- **Dependency Configurations**:
  - \`implementation\`: Hides internal dependencies from downstream consumers.
  - \`api\`: Transitive exposure for multi-project libraries.
  - \`testImplementation\`: Testing libraries like JUnit 5.
  - \`compileOnly\`: Annotation processors and Lombok.`,
        keyPoints: [
          "Gradle Wrapper (./gradlew) guarantees consistent build environments across all developer machines and CI/CD pipelines.",
          "Kotlin DSL provides type-safety and autocomplete inside IntelliJ IDEA."
        ],
        codeExample: {
          filename: "build.gradle.kts",
          code: `plugins {
    java
    id("org.springframework.boot") version "3.2.3"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.2")
}

tasks.test {
    useJUnitPlatform()
}`,
          output: `> Task :compileJava UP-TO-DATE\n> Task :test PASSED\nBUILD SUCCESSFUL in 1s`
        },
        notes: ["Always commit gradlew and gradle/wrapper/gradle-wrapper.properties to version control."],
        commonMistakes: [{ title: "Using implementation when writing public SDK libraries", desc: "Downstream modules cannot see classes from 'implementation' dependencies; use 'api' when writing shared API libraries." }],
        tryIt: { prompt: "Run Gradle build with daemon info:", code: `./gradlew build --info`, hint: "The Gradle daemon speeds up subsequent builds by keeping workers in memory." }
      }
    ]
  },

  // 4. JUnit
  {
    id: "mod-4",
    moduleNumber: 4,
    title: "JUnit 5 & Automated Testing",
    slug: "junit",
    category: "Build Tools & QA",
    categoryId: "build-testing",
    videoTimestamp: "19:04:46",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=68686s",
    description: "Unit testing with JUnit 5 Jupiter, assertions, parameterized tests, test lifecycles, and Mockito mocks.",
    lessonsCount: 2,
    xpReward: 220,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-4-1",
        title: "JUnit 5 Lifecycle & Mockito Integration",
        description: "Master @Test, @BeforeEach, @ParameterizedTest, assertThrows, and Mockito when-then mock verification.",
        duration: "15 min",
        quizId: "quiz-4-1",
        videoTimestamp: "19:04:46",
        concept: `JUnit 5 (Jupiter engine) is the foundation of automated test suites in Java.

Core Annotations:
- \`@Test\`: Declares a test method.
- \`@BeforeEach\` / \`@AfterEach\`: Setup / cleanup executed before/after each individual test.
- \`@BeforeAll\` / \`@AfterAll\`: Static fixture executed once before/after all tests in the class.
- \`@ParameterizedTest\` + \`@ValueSource\`: Executes the same test across multiple input datasets.
- \`assertThrows(Exception.class, () -> ...)\`: Verifies expected exceptions cleanly.`,
        keyPoints: [
          "Mockito (@Mock, @InjectMocks, Mockito.when()) isolates components from real databases and network calls.",
          "Tests should follow the AAA pattern: Arrange, Act, Assert."
        ],
        codeExample: {
          filename: "UserServiceTest.java",
          code: `import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

public class UserServiceTest {

    @Test
    @DisplayName("Should throw exception when registering with invalid email")
    void testInvalidEmailThrows() {
        assertThrows(IllegalArgumentException.class, () -> {
            validateEmail("invalid-email-address");
        });
    }

    @ParameterizedTest
    @ValueSource(strings = {"dev@devhub.io", "alex@company.com"})
    void testValidEmails(String email) {
        assertTrue(email.contains("@"));
    }

    static void validateEmail(String email) {
        if (!email.contains("@")) throw new IllegalArgumentException("Invalid email format");
    }
}`,
          output: `✔ testInvalidEmailThrows() [Passed: 4ms]\n✔ testValidEmails(String) [2 passed: 12ms]`
        },
        notes: ["JUnit 5 test methods and classes can be package-private (no public keyword needed)."],
        commonMistakes: [{ title: "Asserting without failure messages", desc: "assertEquals(expected, actual, 'Failure explanation') makes CI debugging much faster." }],
        tryIt: { prompt: "Verify Mockito stubbing:", code: `Mockito.when(userRepo.findById(1L)).thenReturn(Optional.of(new User("Alex")));`, hint: "Mockito stubs repository responses without hitting actual databases." }
      }
    ]
  },

  // 5. Git
  {
    id: "mod-5",
    moduleNumber: 5,
    title: "Git Version Control for Java",
    slug: "git",
    category: "DevOps & Cloud",
    categoryId: "devops-cloud",
    videoTimestamp: "21:05:16",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=75916s",
    description: "Branching strategies, merge vs rebase, cherry-pick, conflict resolution, and .gitignore for Java projects.",
    lessonsCount: 2,
    xpReward: 200,
    difficulty: "Beginner",
    estimatedMinutes: 25,
    lessons: [
      {
        id: "lesson-5-1",
        title: "Git Workflow, Interactive Rebase & Branching",
        description: "Master feature branch workflows, git rebase -i, stash, and merge conflicts.",
        duration: "12 min",
        quizId: "quiz-5-1",
        videoTimestamp: "21:05:16",
        concept: `Git is a distributed version control system essential for enterprise collaborative software engineering.

Key Concepts:
- **Three Trees**: Working Directory -> Staging Index (\`git add\`) -> Commit History (\`git commit\`).
- **Merge vs Rebase**:
  - \`git merge\`: Preserves exact history with a dedicated merge commit.
  - \`git rebase\`: Rewrites branch commits on top of the latest target branch base for a linear history.
- **Java .gitignore**: Always ignore \`/target\`, \`/build\`, \`.gradle\`, \`.idea\`, and \`*.class\` files.`,
        keyPoints: [
          "git stash saves uncommitted modifications temporarily when switching urgent bugfix branches.",
          "git cherry-pick <commit-hash> applies a specific commit from another branch without full merge."
        ],
        codeExample: {
          filename: "GitWorkflow.sh",
          code: `# Create and switch to feature branch
git checkout -b feature/jwt-auth

# Stage and commit clean atomic changes
git add src/main/java/com/devhub/security/
git commit -m "feat(security): implement JWT token filter and validation"

# Rebase onto latest main before PR
git fetch origin
git rebase origin/main`,
          output: `Successfully rebased and updated refs/heads/feature/jwt-auth.`
        },
        notes: ["Never perform interactive rebase (git rebase -i) on shared public branches."],
        commonMistakes: [{ title: "Committing target/ and .class files", desc: "Build artifacts should never be checked into Git repository history." }],
        tryIt: { prompt: "How to discard uncommitted working directory changes?", code: `git restore <file>`, hint: "git restore reverts modified files to the HEAD commit state." }
      }
    ]
  },

  // 6. DSA in Java
  {
    id: "mod-6",
    moduleNumber: 6,
    title: "DSA (Data Structures & Algorithms)",
    slug: "dsa",
    category: "Core Java & DSA",
    categoryId: "core-dsa",
    videoTimestamp: "26:12:28",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=94348s",
    description: "Big-O notation, LinkedLists, Binary Search Trees, Graphs, PriorityQueue, and Dynamic Programming in Java.",
    lessonsCount: 3,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 45,
    lessons: [
      {
        id: "lesson-6-1",
        title: "Time Complexities, Trees & Two-Pointer Patterns",
        description: "Analyze Big-O runtime, TreeNode traversals, and optimal sliding window algorithms.",
        duration: "15 min",
        quizId: "quiz-6-1",
        videoTimestamp: "26:12:28",
        concept: `Mastering Data Structures & Algorithms enables writing performant, scalable Java applications:

- **Array / ArrayList**: O(1) random access by index; O(n) worst-case insertion/deletion.
- **HashMap / HashSet**: Average O(1) lookup using hash codes and bucket arrays.
- **Binary Search**: O(log n) search on sorted arrays using two-pointers.
- **PriorityQueue (Min/Max Heap)**: O(log n) insertion and removal of minimum/maximum elements.`,
        keyPoints: [
          "Two-pointer technique reduces nested O(n^2) loops to linear O(n) time on sorted data.",
          "Tree traversals: Inorder (Left, Root, Right), Preorder (Root, Left, Right), Postorder, and BFS level-order."
        ],
        codeExample: {
          filename: "TwoSumSorted.java",
          code: `public class TwoSumSorted {
    public static int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left, right};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        int[] sortedArr = {2, 7, 11, 15};
        int[] indices = twoSum(sortedArr, 9);
        System.out.printf("Indices: [%d, %d]%n", indices[0], indices[1]);
    }
}`,
          output: `Indices: [0, 1]`
        },
        notes: ["Java's Arrays.sort() uses Dual-Pivot Quicksort for primitives O(n log n) and Timsort for objects."],
        commonMistakes: [{ title: "Using LinkedList for index lookups", desc: "LinkedList.get(index) is O(n) linear scan, whereas ArrayList.get(index) is O(1) direct memory offset." }],
        tryIt: { prompt: "Find middle of linked list in one pass:", code: `// Fast and Slow pointer pattern: slow moves 1 step, fast moves 2 steps.`, hint: "When fast pointer reaches null, slow pointer sits at the exact midpoint." }
      }
    ]
  },

  // 7. JDBC
  {
    id: "mod-7",
    moduleNumber: 7,
    title: "JDBC & Connection Pooling",
    slug: "jdbc",
    category: "Web & Persistence",
    categoryId: "web-orm",
    videoTimestamp: "28:39:36",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=103176s",
    description: "DriverManager, PreparedStatement, SQL injection prevention, transactions, and HikariCP connection pooling.",
    lessonsCount: 2,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-7-1",
        title: "Secure PreparedStatement & HikariCP Transactions",
        description: "Execute SQL queries safely with parameters, manage transactions with commit/rollback, and pool connections.",
        duration: "15 min",
        quizId: "quiz-7-1",
        videoTimestamp: "28:39:36",
        concept: `JDBC (Java Database Connectivity) is the foundational database API in Java:

1. **PreparedStatement**: Parameterized queries compiled by the DB engine; completely eliminates SQL Injection attacks.
2. **Transaction Management**:
   - \`conn.setAutoCommit(false)\`: Begins manual transaction boundary.
   - \`conn.commit()\`: Persists all modifications atomically.
   - \`conn.rollback()\`: Reverts changes on any failure.
3. **HikariCP**: High-performance JDBC connection pool used as the default in Spring Boot.`,
        keyPoints: [
          "PreparedStatement parameters are 1-indexed (e.g. ps.setString(1, val)).",
          "Always close ResultSets, Statements, and Connections using try-with-resources to avoid connection pool exhaustion."
        ],
        codeExample: {
          filename: "JdbcTransaction.java",
          code: `import java.sql.*;

public class JdbcTransaction {
    public static void transferFunds(Connection conn, long fromId, long toId, double amount) throws SQLException {
        conn.setAutoCommit(false); // Begin transaction
        try (
            var debit = conn.prepareStatement("UPDATE accounts SET balance = balance - ? WHERE id = ?");
            var credit = conn.prepareStatement("UPDATE accounts SET balance = balance + ? WHERE id = ?")
        ) {
            debit.setDouble(1, amount); debit.setLong(2, fromId); debit.executeUpdate();
            credit.setDouble(1, amount); credit.setLong(2, toId); credit.executeUpdate();
            
            conn.commit(); // Atomic commit
            System.out.println("Funds transferred successfully!");
        } catch (SQLException ex) {
            conn.rollback(); // Safe rollback
            throw ex;
        }
    }
}`,
          output: `Funds transferred successfully!`
        },
        notes: ["HikariCP maintains warm idle database sockets, reducing query latency by up to 90%."],
        commonMistakes: [{ title: "String concatenation in SQL queries", desc: "Never concatenate user input directly into SQL strings. Always use PreparedStatement with placeholders '?'." }],
        tryIt: { prompt: "Execute batch inserts in JDBC:", code: `ps.addBatch();\nps.executeBatch();`, hint: "Batching bundles multiple insert statements into a single network round-trip." }
      }
    ]
  },

  // 8. Servlets and JSP
  {
    id: "mod-8",
    moduleNumber: 8,
    title: "Servlets & JSP",
    slug: "servlets-and-jsp",
    category: "Web & Persistence",
    categoryId: "web-orm",
    videoTimestamp: "32:08:43",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=115723s",
    description: "HttpServletRequest, HttpServletResponse, Servlet lifecycles (init, service, destroy), Filters, and Sessions.",
    lessonsCount: 2,
    xpReward: 220,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-8-1",
        title: "Servlet Lifecycle, Filters & Session Management",
        description: "Understand doGet, doPost, @WebServlet, FilterChain, and HttpSession cookies.",
        duration: "15 min",
        quizId: "quiz-8-1",
        videoTimestamp: "32:08:43",
        concept: `Servlets are Java classes that handle HTTP requests in web containers (like Apache Tomcat, Jetty):

- **Servlet Lifecycle**:
  1. \`init()\`: Called once when loading the servlet into memory.
  2. \`service()\`: Dispatches requests to \`doGet()\`, \`doPost()\`, \`doPut()\`, \`doDelete()\`.
  3. \`destroy()\`: Called when shutting down the container.
- **Servlet Filters**: Intercept and transform requests/responses before reaching servlets (used for authentication, CORS, logging).
- **HttpSession**: Tracks conversational state across multiple requests via \`JSESSIONID\` cookies.`,
        keyPoints: [
          "Servlets are multithreaded singletons: a single instance handles concurrent requests across multiple threads.",
          "Avoid instance variables in servlets to prevent race conditions and thread safety bugs."
        ],
        codeExample: {
          filename: "HelloServlet.java",
          code: `import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebServlet("/api/greet")
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String name = req.getParameter("name");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write("{\"message\": \"Hello, " + (name != null ? name : "Builder") + "\"}");
    }
}`,
          output: `{"message": "Hello, Alex"}`
        },
        notes: ["Spring MVC DispatcherServlet is fundamentally built on top of the standard Servlet API."],
        commonMistakes: [{ title: "Storing request data in servlet fields", desc: "Since servlets are singletons, instance fields are shared across all concurrent user requests." }],
        tryIt: { prompt: "Pass request along the filter chain:", code: `chain.doFilter(request, response);`, hint: "chain.doFilter() forwards execution to the next filter or target servlet." }
      }
    ]
  },

  // 9. REST API and Web Services
  {
    id: "mod-9",
    moduleNumber: 9,
    title: "REST API & Web Services",
    slug: "rest-api",
    category: "Web & Persistence",
    categoryId: "web-orm",
    videoTimestamp: "34:43:17",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=124997s",
    description: "HTTP verbs (GET, POST, PUT, PATCH, DELETE), Status codes (200, 201, 400, 401, 404, 500), RESTful constraints, and OpenAPI.",
    lessonsCount: 2,
    xpReward: 230,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-9-1",
        title: "REST Principles & HTTP Status Architecture",
        description: "Master idempotent operations, resource URIs, payload negotiation, and API design standards.",
        duration: "15 min",
        quizId: "quiz-9-1",
        videoTimestamp: "34:43:17",
        concept: `REST (Representational State Transfer) is an architectural style for networked web applications:

Key Principles:
1. **Stateless**: Every request from client to server must contain all necessary authentication and query context.
2. **Resource-Oriented URIs**: Use plural nouns, not verbs (e.g. \`GET /api/v1/users/42\`, \`POST /api/v1/orders\`).
3. **HTTP Verbs**:
   - \`GET\`: Safe & Idempotent (retrieve resource).
   - \`POST\`: Non-idempotent (create new resource, returns 201 Created).
   - \`PUT\`: Idempotent (replace entire resource).
   - \`PATCH\`: Partial update of specified fields.
   - \`DELETE\`: Idempotent (remove resource, returns 204 No Content).`,
        keyPoints: [
          "Status code ranges: 2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error).",
          "Use standard RFC 7807 Problem Details JSON format for error responses."
        ],
        codeExample: {
          filename: "RestResponse.json",
          code: `// HTTP/1.1 201 Created
// Location: /api/v1/products/984
{
  "id": 984,
  "name": "Mechanical Keyboard",
  "price": 129.99,
  "currency": "USD",
  "createdAt": "2026-08-31T18:00:00Z"
}`,
          output: `Status: 201 Created\nLocation: /api/v1/products/984`
        },
        notes: ["Idempotence means multiple identical requests produce the exact same server state."],
        commonMistakes: [{ title: "Using verbs in REST endpoints", desc: "Writing '/api/getUsers' or '/api/deleteUser' violates REST conventions; use HTTP GET and DELETE on '/api/users'." }],
        tryIt: { prompt: "Which status code represents unauthenticated access?", code: `401 Unauthorized (vs 403 Forbidden for insufficient permissions)`, hint: "401 means missing/invalid credentials; 403 means authenticated but not authorized." }
      }
    ]
  },

  // 10. What Is an ORM Tool?
  {
    id: "mod-10",
    moduleNumber: 10,
    title: "What Is an ORM Tool?",
    slug: "what-is-orm",
    category: "Web & Persistence",
    categoryId: "web-orm",
    videoTimestamp: "34:53:11",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=125591s",
    description: "Object-Relational Impedance Mismatch, entity mapping, identity, association mapping, and JPA specification.",
    lessonsCount: 1,
    xpReward: 180,
    difficulty: "Beginner",
    estimatedMinutes: 20,
    lessons: [
      {
        id: "lesson-10-1",
        title: "Object-Relational Mapping & The Impedance Mismatch",
        description: "Understand why ORM tools bridge the gap between Java classes and relational SQL tables.",
        duration: "12 min",
        quizId: "quiz-10-1",
        videoTimestamp: "34:53:11",
        concept: `Object-Relational Mapping (ORM) bridges Java's object-oriented paradigm and Relational Databases (RDBMS):

- **Impedance Mismatch**:
  - Java uses classes, references, inheritance, polymorphism, and encapsulation.
  - Relational SQL uses tables, foreign keys, constraints, and joins.
- **JPA (Jakarta Persistence API)**: The standard Java specification for ORM (interfaces and annotations like \`@Entity\`, \`@Table\`, \`@Id\`).
- **Hibernate**: The most popular concrete implementation of the JPA specification.`,
        keyPoints: [
          "ORM eliminates thousands of lines of boilerplate ResultSet parsing and PreparedStatement parameter mapping.",
          "JPA annotations standardize entity models across any underlying provider (Hibernate, EclipseLink)."
        ],
        codeExample: {
          filename: "UserEntity.java",
          code: `import jakarta.persistence.*;

@Entity
@Table(name = "dev_users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "xp_points")
    private int xpPoints;

    // Getters and setters
}`,
          output: `// Maps directly to table: dev_users(id BIGSERIAL PRIMARY KEY, email VARCHAR NOT NULL, xp_points INT)`
        },
        notes: ["JPA is the specification (interface); Hibernate is the engine (implementation)."],
        commonMistakes: [{ title: "Missing default no-arg constructor in JPA entities", desc: "JPA reflection requires a public or protected no-argument constructor to instantiate entities." }],
        tryIt: { prompt: "Identity generation strategy in PostgreSQL:", code: `@GeneratedValue(strategy = GenerationType.IDENTITY)`, hint: "IDENTITY delegates ID generation to the database auto-incrementing identity column." }
      }
    ]
  },

  // 11. Hibernate
  {
    id: "mod-11",
    moduleNumber: 11,
    title: "Hibernate Core & Persistence",
    slug: "hibernate",
    category: "Web & Persistence",
    categoryId: "web-orm",
    videoTimestamp: "35:44:49",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=128689s",
    description: "SessionFactory, Session, First/Second-level cache, entity states (Transient, Persistent, Detached), and N+1 query problem.",
    lessonsCount: 2,
    xpReward: 260,
    difficulty: "Advanced",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-11-1",
        title: "Entity Lifecycles & Solving the N+1 Query Problem",
        description: "Master entity states, dirty checking, lazy loading, and JOIN FETCH optimization.",
        duration: "15 min",
        quizId: "quiz-11-1",
        videoTimestamp: "35:44:49",
        concept: `Hibernate manages objects across distinct lifecycle states:

1. **Transient**: Newly created object with \`new\`; not managed in session, has no DB ID.
2. **Persistent (Managed)**: Associated with active Session; modifications are automatically flushed to DB via **Dirty Checking**.
3. **Detached**: Session is closed; object exists in memory with DB ID but changes are not tracked.
4. **Removed**: Scheduled for deletion on next flush.

**The N+1 Query Problem**:
Fetching a list of N parent entities causes 1 query for parents, and then N separate queries for each parent's children. Fix with \`JOIN FETCH\` in JPQL or \`@EntityGraph\`.`,
        keyPoints: [
          "First-Level Cache (Session-level) is enabled by default to prevent duplicate SQL queries in the same transaction.",
          "Use FetchType.LAZY on @OneToMany and @ManyToOne to prevent loading entire database graphs into memory."
        ],
        codeExample: {
          filename: "JoinFetchOptimization.java",
          code: `// JPQL query with JOIN FETCH avoids N+1 problem:
String jpql = "SELECT u FROM User u JOIN FETCH u.completedQuizzes WHERE u.xpPoints > :minXp";

List<User> topUsers = entityManager.createQuery(jpql, User.class)
    .setParameter("minXp", 500)
    .getResultList();

System.out.println("Loaded " + topUsers.size() + " users in 1 single SQL JOIN query!");`,
          output: `Loaded 42 users in 1 single SQL JOIN query!`
        },
        notes: ["Never rely on FetchType.EAGER on relationships in high-scale production services."],
        commonMistakes: [{ title: "Triggering lazy loading outside an active transaction", desc: "Accessing uninitialized lazy collections after session closes throws LazyInitializationException." }],
        tryIt: { prompt: "How does dirty checking work?", code: `user.setEmail("new@devhub.io"); // Automatically updates DB on tx.commit()!`, hint: "Hibernate compares current entity state with original snapshot taken during load." }
      }
    ]
  },

  // 12. Spring Framework
  {
    id: "mod-12",
    moduleNumber: 12,
    title: "Spring Framework & IoC Container",
    slug: "spring-framework",
    category: "Spring Boot Ecosystem",
    categoryId: "spring-boot",
    videoTimestamp: "37:38:20",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=135500s",
    description: "Inversion of Control (IoC), Dependency Injection (DI), ApplicationContext, Bean scopes, and Spring AOP.",
    lessonsCount: 2,
    xpReward: 260,
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-12-1",
        title: "Dependency Injection, Bean Scopes & ApplicationContext",
        description: "Master constructor injection, @Component, @Service, @Configuration, and singleton vs prototype scopes.",
        duration: "15 min",
        quizId: "quiz-12-1",
        videoTimestamp: "37:38:20",
        concept: `The core philosophy of the Spring Framework is **Inversion of Control (IoC)** powered by **Dependency Injection (DI)**:

- **IoC Container (ApplicationContext)**: Instantiates, configures, wires, and manages the entire lifecycle of Spring Beans.
- **Dependency Injection Modes**:
  - **Constructor Injection (Best Practice)**: Ensures immutability with \`final\` fields and facilitates easy unit testing.
  - **Setter Injection**: Useful for optional dependencies.
  - **Field Injection (@Autowired on field)**: Anti-pattern; discourages testability.
- **Bean Scopes**: \`singleton\` (one instance per container), \`prototype\` (new instance per injection), \`request\`, \`session\`.`,
        keyPoints: [
          "Spring components: @Component, @Service (business logic), @Repository (DAO with exception translation), @Controller.",
          "Constructor injection without explicit @Autowired works automatically in modern Spring 5+."
        ],
        codeExample: {
          filename: "OrderService.java",
          code: `import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final PaymentGateway paymentGateway;
    private final NotificationService notificationService;

    // Constructor Injection (Clean, immutable, testable)
    public OrderService(PaymentGateway paymentGateway, NotificationService notificationService) {
        this.paymentGateway = paymentGateway;
        this.notificationService = notificationService;
    }

    public void processOrder(String orderId, double amount) {
        paymentGateway.charge(amount);
        notificationService.sendReceipt(orderId);
    }
}`,
          output: `[Spring ApplicationContext] Injected PaymentGateway and NotificationService into OrderService.`
        },
        notes: ["Spring AOP (Aspect-Oriented Programming) powers annotations like @Transactional, @Async, and @Secured via dynamic proxies."],
        commonMistakes: [{ title: "Circular dependencies between beans", desc: "Bean A depending on Bean B while Bean B depends on Bean A causes BeanCurrentlyInCreationException. Refactor design or use @Lazy." }],
        tryIt: { prompt: "Declare a Spring Bean configuration class:", code: `@Configuration\npublic class AppConfig {\n    @Bean public RestTemplate restTemplate() { return new RestTemplate(); }\n}`, hint: "@Bean methods inside @Configuration classes produce managed Spring beans." }
      }
    ]
  },

  // 13. Spring REST API Using Spring Boot
  {
    id: "mod-13",
    moduleNumber: 13,
    title: "Spring REST API Using Spring Boot",
    slug: "spring-rest-api",
    category: "Spring Boot Ecosystem",
    categoryId: "spring-boot",
    videoTimestamp: "38:55:14",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=140114s",
    description: "@RestController, @GetMapping, @PostMapping, @PathVariable, @RequestBody, @RestControllerAdvice, and Validation.",
    lessonsCount: 2,
    xpReward: 280,
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-13-1",
        title: "REST Controllers, DTO Validation & Global Exception Handling",
        description: "Build robust REST APIs with @Valid, BindingResult, ResponseEntity, and @ExceptionHandler.",
        duration: "15 min",
        quizId: "quiz-13-1",
        videoTimestamp: "38:55:14",
        concept: `Spring Boot streamlines production REST API development:

- \`@RestController\`: Combines \`@Controller\` and \`@ResponseBody\`, automatically serializing Java objects to JSON via Jackson.
- **Request Annotations**:
  - \`@GetMapping\`, \`@PostMapping\`, \`@PutMapping\`, \`@DeleteMapping\`.
  - \`@PathVariable\`: Extracts values from URI path (\`/users/{id}\`).
  - \`@RequestParam\`: Query parameters (\`?page=1&size=20\`).
  - \`@RequestBody\`: Deserializes JSON payload into a DTO.
- **Global Error Handling**: \`@RestControllerAdvice\` with \`@ExceptionHandler\` returns standardized error payloads.`,
        keyPoints: [
          "Use Bean Validation (@NotNull, @Size, @Email, @Min) on DTOs with @Valid in controller signatures.",
          "Return ResponseEntity<T> to control HTTP status codes, headers, and response bodies explicitly."
        ],
        codeExample: {
          filename: "CourseController.java",
          code: `import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    @PostMapping
    public ResponseEntity<CourseResponseDto> createCourse(@Valid @RequestBody CourseRequestDto request) {
        CourseResponseDto created = new CourseResponseDto(1L, request.title(), 150);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponseDto> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok(new CourseResponseDto(id, "Java 21 Mastery", 250));
    }
}`,
          output: `HTTP/1.1 201 Created\nContent-Type: application/json\n{"id": 1, "title": "Java 21 Mastery", "xp": 150}`
        },
        notes: ["Spring Boot Auto-Configuration configures Jackson ObjectMapper, Tomcat web server, and routing automatically."],
        commonMistakes: [{ title: "Exposing JPA Entities directly in REST Controller methods", desc: "Always map JPA entities to DTOs (Data Transfer Objects) to avoid accidental sensitive data leakage and recursive JSON serialization loops." }],
        tryIt: { prompt: "Global exception handler annotation:", code: `@RestControllerAdvice\npublic class GlobalExceptionHandler {\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorDto> handleNotFound(Exception ex) {\n        return ResponseEntity.status(404).body(new ErrorDto(ex.getMessage()));\n    }\n}`, hint: "@RestControllerAdvice intercepts exceptions thrown across all REST controllers." }
      }
    ]
  },

  // 14. Spring JDBC
  {
    id: "mod-14",
    moduleNumber: 14,
    title: "Spring JDBC & JdbcClient",
    slug: "spring-jdbc",
    category: "Web & Persistence",
    categoryId: "web-orm",
    videoTimestamp: "39:24:38",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=141878s",
    description: "JdbcTemplate, NamedParameterJdbcTemplate, RowMapper, and Spring Boot 3.2+ fluent JdbcClient.",
    lessonsCount: 1,
    xpReward: 200,
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    lessons: [
      {
        id: "lesson-14-1",
        title: "Fluent JdbcClient & Lightweight SQL in Spring 3.2",
        description: "Query databases efficiently without full ORM overhead using Spring's fluent JdbcClient.",
        duration: "15 min",
        quizId: "quiz-14-1",
        videoTimestamp: "39:24:38",
        concept: `Spring JDBC eliminates raw JDBC boilerplate (closing connections, handling SQLExceptions):

- **JdbcClient (Spring 6.1 / Spring Boot 3.2+)**: Provides a modern, fluent API for executing SQL queries with type mapping.
- **Exception Translation**: Converts vendor-specific SQLExceptions into Spring's clean \`DataAccessException\` hierarchy.`,
        keyPoints: [
          "JdbcClient is ideal for high-throughput reporting queries and microservices that don't need heavy ORM state tracking.",
          "Supports automatic record mapping via .query(UserRecord.class).list()."
        ],
        codeExample: {
          filename: "UserJdbcRepository.java",
          code: `import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class UserJdbcRepository {
    private final JdbcClient jdbcClient;

    public UserJdbcRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<UserRecord> findTopLearners(int minXp) {
        return jdbcClient.sql("SELECT id, name, email, xp FROM users WHERE xp >= :xp ORDER BY xp DESC")
            .param("xp", minXp)
            .query(UserRecord.class)
            .list();
    }
}`,
          output: `Found 120 learners with xp >= 500 via JdbcClient.`
        },
        notes: ["JdbcClient unifies JdbcTemplate and NamedParameterJdbcTemplate into a single expressive API."],
        commonMistakes: [{ title: "Manually writing RowMapper for records in Spring 3.2+", desc: "JdbcClient automatically maps database column names to record components without custom RowMappers." }],
        tryIt: { prompt: "Execute insert with generated keys in JdbcClient:", code: `Long id = jdbcClient.sql("INSERT INTO logs(msg) VALUES (?)")\n    .param("App Started")\n    .update(keyHolder);`, hint: "GeneratedKeyHolder captures database-assigned auto-increment primary keys." }
      }
    ]
  },

  // 15. Spring Data JPA
  {
    id: "mod-15",
    moduleNumber: 15,
    title: "Spring Data JPA",
    slug: "spring-data-jpa",
    category: "Spring Boot Ecosystem",
    categoryId: "spring-boot",
    videoTimestamp: "39:55:47",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=143747s",
    description: "JpaRepository, Derived query methods, @Query with JPQL/Native SQL, Pagination & Sorting, and Auditing.",
    lessonsCount: 2,
    xpReward: 280,
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-15-1",
        title: "JpaRepository, Query Methods & Pagination",
        description: "Master findByEmail, Pageable, @Query, @Modifying, and @EnableJpaAuditing.",
        duration: "15 min",
        quizId: "quiz-15-1",
        videoTimestamp: "39:55:47",
        concept: `Spring Data JPA generates repository implementations automatically from interface declarations:

1. **Derived Query Methods**: Method names are parsed into SQL queries:
   - \`findByEmail(String email)\`
   - \`findByXpPointsGreaterThanAndActiveTrue(int xp)\`
2. **Custom JPQL & Native Queries**: Use \`@Query("SELECT u FROM User u WHERE u.xp > :xp")\`.
3. **Pagination & Sorting**: Pass \`Pageable pageable = PageRequest.of(0, 10, Sort.by("xp").descending())\` returning \`Page<T>\`.`,
        keyPoints: [
          "Extending JpaRepository<Entity, ID> gives CRUD operations (save, findById, findAll, delete) out of the box.",
          "Use @Modifying for UPDATE and DELETE @Query statements."
        ],
        codeExample: {
          filename: "UserRepository.java",
          code: `import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Derived query method
    Optional<User> findByEmail(String email);

    // Custom JPQL query with Pagination
    @Query("SELECT u FROM User u WHERE u.xpPoints >= :minXp")
    Page<User> findHighRankedUsers(int minXp, Pageable pageable);
}`,
          output: `Generated: SELECT * FROM users WHERE xp_points >= ? ORDER BY xp_points DESC LIMIT 10 OFFSET 0`
        },
        notes: ["Spring Data JPA auditing automatically fills @CreatedDate and @LastModifiedDate fields."],
        commonMistakes: [{ title: "Calling count query on massive datasets without slice", desc: "Page<T> triggers an extra SELECT COUNT(*) query; use Slice<T> if you only need 'load more' without total page counts." }],
        tryIt: { prompt: "Create a pageable request:", code: `Pageable page = PageRequest.of(0, 20, Sort.by("createdAt").descending());`, hint: "PageRequest is 0-indexed for page numbers." }
      }
    ]
  },

  // 16. Project Using Spring Boot MVC
  {
    id: "mod-16",
    moduleNumber: 16,
    title: "Project Using Spring Boot MVC",
    slug: "spring-boot-mvc",
    category: "Spring Boot Ecosystem",
    categoryId: "spring-boot",
    videoTimestamp: "41:40:32",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=150032s",
    description: "End-to-end full stack Java MVC application architecture, Thymeleaf templates, forms, validation, and session state.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-16-1",
        title: "Building an End-to-End Spring Boot MVC Project",
        description: "Tie Controller, Model, Service, and Repository layers into a cohesive production application.",
        duration: "15 min",
        quizId: "quiz-16-1",
        videoTimestamp: "41:40:32",
        concept: `The Model-View-Controller (MVC) architecture separates application concerns:

- **Model**: Encapsulates business data and state (Entities and DTOs).
- **View**: Renders UI to the user (Thymeleaf HTML templates or React single-page apps).
- **Controller**: Intercepts HTTP requests, coordinates with Service layer, and returns View names or JSON.`,
        keyPoints: [
          "Layered Architecture: Controller -> Service (Business Logic) -> Repository (Data Access) -> Database.",
          "@ModelAttribute binds form data to Java objects during POST submissions."
        ],
        codeExample: {
          filename: "DashboardMvcController.java",
          code: `import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardMvcController {
    private final UserService userService;

    public DashboardMvcController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/dashboard")
    public String showDashboard(Model model) {
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("recentQuizzes", userService.getRecentQuizzes());
        return "dashboard"; // Renders templates/dashboard.html
    }
}`,
          output: `Rendered view: dashboard.html with dynamic model attributes.`
        },
        notes: ["Keep Controllers lean; place validation, orchestration, and business logic strictly in Service classes."],
        commonMistakes: [{ title: "Writing business calculations inside the View template", desc: "Views should only present data, not execute business calculations." }],
        tryIt: { prompt: "Redirect after POST pattern in Spring MVC:", code: `return "redirect:/dashboard"; // Prevents duplicate form resubmissions`, hint: "The Post/Redirect/Get (PRG) pattern prevents users from resubmitting forms on page refresh." }
      }
    ]
  },

  // 17. Spring Security
  {
    id: "mod-17",
    moduleNumber: 17,
    title: "Spring Security Architecture",
    slug: "spring-security",
    category: "Security & Auth",
    categoryId: "security-auth",
    videoTimestamp: "43:36:28",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=156988s",
    description: "SecurityFilterChain, authentication vs authorization, PasswordEncoder (BCrypt), UserDetailsService, and CSRF protection.",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 40,
    lessons: [
      {
        id: "lesson-17-1",
        title: "SecurityFilterChain & BCrypt Password Hashing",
        description: "Configure modern component-based Spring Security 6 without deprecated WebSecurityConfigurerAdapter.",
        duration: "15 min",
        quizId: "quiz-17-1",
        videoTimestamp: "43:36:28",
        concept: `Spring Security is the enterprise standard for authentication and access-control in Java applications:

- **Authentication**: Verifying who a user is (e.g. username/password, JWT, OAuth2).
- **Authorization**: Verifying whether the user has permission to access a specific resource (e.g. \`ROLE_ADMIN\`, \`SCOPE_read\`).
- **SecurityFilterChain**: A series of servlet filters that inspect every inbound HTTP request.
- **BCryptPasswordEncoder**: Computes salted, iterative cryptographic hashes of passwords.`,
        keyPoints: [
          "In Spring Security 6+, declare a @Bean of type SecurityFilterChain using HttpSecurity lambdas.",
          "Stateless REST APIs disable CSRF and session creation (SessionCreationPolicy.STATELESS)."
        ],
        codeExample: {
          filename: "SecurityConfig.java",
          code: `import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**", "/public/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
          output: `[Spring Security] SecurityFilterChain configured: Public auth endpoints opened, /admin locked to ROLE_ADMIN.`
        },
        notes: ["Never store raw plaintext passwords in databases; BCrypt automatically embeds the random salt in the generated hash string."],
        commonMistakes: [{ title: "Prefixing hasRole('ADMIN') with 'ROLE_'", desc: "hasRole('ADMIN') automatically prefixes 'ROLE_'. Writing hasRole('ROLE_ADMIN') checks for 'ROLE_ROLE_ADMIN'." }],
        tryIt: { prompt: "Hash a password using BCrypt:", code: `String hash = passwordEncoder.encode("secretPassword123");`, hint: "BCrypt outputs a 60-character string starting with $2a$ or $2b$." }
      }
    ]
  },

  // 18. JWT
  {
    id: "mod-18",
    moduleNumber: 18,
    title: "JWT (JSON Web Tokens)",
    slug: "jwt",
    category: "Security & Auth",
    categoryId: "security-auth",
    videoTimestamp: "44:40:32",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=160832s",
    description: "Header, Payload, Signature structure, JJWT library, token generation, claim extraction, and JwtAuthenticationFilter.",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-18-1",
        title: "JWT Token Generation, Validation & Filter Pipeline",
        description: "Build a stateless authentication filter extracting Bearer tokens from HTTP Authorization headers.",
        duration: "15 min",
        quizId: "quiz-18-1",
        videoTimestamp: "44:40:32",
        concept: `JSON Web Tokens (JWT) are compact, URL-safe cryptographic tokens used for stateless authentication:

- **JWT Structure**: \`Header.Payload.Signature\`
  1. **Header**: Algorithm and token type (e.g. \`{"alg": "HS256", "typ": "JWT"}\`).
  2. **Payload (Claims)**: User ID, subject (\`sub\`), roles, expiration (\`exp\`), issued at (\`iat\`).
  3. **Signature**: Cryptographic HMAC-SHA256 signature generated using a private server secret key.
- **Statelessness**: The server verifies token integrity without looking up server-side sessions in Redis or DB.`,
        keyPoints: [
          "Clients send the token in the HTTP header: Authorization: Bearer <token>.",
          "JwtAuthenticationFilter extends OncePerRequestFilter to parse tokens and populate SecurityContextHolder."
        ],
        codeExample: {
          filename: "JwtService.java",
          code: `import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

public class JwtService {
    private final Key secretKey = Keys.hmacShaKeyFor("superSecretDevHubKeyMustBe32BytesMinLength!".getBytes());

    public String generateToken(String username, String role) {
        return Jwts.builder()
            .setSubject(username)
            .claim("role", role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
            .signWith(secretKey, SignatureAlgorithm.HS256)
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build()
            .parseClaimsJws(token).getBody().getSubject();
    }
}`,
          output: `Generated: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGV4IiwiZXhwIjoxNzk4NzAwMDB9.5T9a4_k2...`
        },
        notes: ["Never put sensitive secrets (like passwords or credit card numbers) in JWT payloads because payloads are only base64-encoded, not encrypted."],
        commonMistakes: [{ title: "Failing to check token expiration date", desc: "Always handle ExpiredJwtException to reject expired tokens." }],
        tryIt: { prompt: "Populate Spring Security context with authenticated user:", code: `SecurityContextHolder.getContext().setAuthentication(authToken);`, hint: "Populating SecurityContextHolder tells Spring Security that the current thread's request is authenticated." }
      }
    ]
  },

  // 19. OAuth2
  {
    id: "mod-19",
    moduleNumber: 19,
    title: "OAuth2 & OpenID Connect (OIDC)",
    slug: "oauth2",
    category: "Security & Auth",
    categoryId: "security-auth",
    videoTimestamp: "44:56:28",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=161788s",
    description: "Authorization Code Flow with PKCE, Client Credentials, Resource Servers, Identity Providers (Google, GitHub, Keycloak).",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-19-1",
        title: "OAuth2 Authorization Code Flow with PKCE",
        description: "Master authorization grants, access tokens, refresh tokens, and Spring Security OAuth2 Login.",
        duration: "15 min",
        quizId: "quiz-19-1",
        videoTimestamp: "44:56:28",
        concept: `OAuth 2.0 is a delegated authorization framework, and OpenID Connect (OIDC) adds an identity layer on top:

Key Roles:
1. **Resource Owner**: The end user.
2. **Client**: The application requesting access (DevHub).
3. **Authorization Server**: Issues tokens after authentication (Google, GitHub, Keycloak).
4. **Resource Server**: The API holding protected user data.

**Authorization Code Flow with PKCE (Proof Key for Code Exchange)**:
1. Client redirects user to Auth Server with code challenge.
2. User authenticates and authorizes permissions.
3. Auth Server redirects back with an authorization code.
4. Client exchanges authorization code + PKCE code verifier for an **Access Token** & **ID Token**.`,
        keyPoints: [
          "spring-boot-starter-oauth2-client configures social login (GitHub, Google) with zero custom servlet code.",
          "Access tokens authorize API calls; ID tokens provide user profile identity."
        ],
        codeExample: {
          filename: "application.yml",
          code: `spring:
  security:
    oauth2:
      client:
        registration:
          github:
            client-id: GITHUB_CLIENT_ID_ENV
            client-secret: GITHUB_CLIENT_SECRET_ENV
            scope: read:user, user:email`,
          output: `[OAuth2] Configured GitHub Identity Provider with scope: read:user, user:email.`
        },
        notes: ["Client Credentials flow is used for machine-to-machine microservice authentication without end-user interaction."],
        commonMistakes: [{ title: "Exposing OAuth2 Client Secret in client-side frontends", desc: "Client secrets must reside strictly on backend servers; single-page apps use PKCE without client secrets." }],
        tryIt: { prompt: "Spring Security OAuth2 login configuration:", code: `http.oauth2Login(Customizer.withDefaults());`, hint: "Automatically mounts /oauth2/authorization/{registrationId} redirect endpoints." }
      }
    ]
  },

  // 20. Logging in Java Using Log4j
  {
    id: "mod-20",
    moduleNumber: 20,
    title: "Logging in Java Using Log4j & SLF4J",
    slug: "logging-log4j",
    category: "Build Tools & QA",
    categoryId: "build-testing",
    videoTimestamp: "46:03:03",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=165783s",
    description: "SLF4J abstraction, Log4j2 / Logback, log levels (TRACE, DEBUG, INFO, WARN, ERROR), appenders, and structured JSON logs.",
    lessonsCount: 1,
    xpReward: 200,
    difficulty: "Beginner",
    estimatedMinutes: 25,
    lessons: [
      {
        id: "lesson-20-1",
        title: "SLF4J Facade, Log Levels & Structured Logging",
        description: "Master parameterized logging, logback-spring.xml, rolling file appenders, and MDC context.",
        duration: "15 min",
        quizId: "quiz-20-1",
        videoTimestamp: "46:03:03",
        concept: `Enterprise Java uses **SLF4J (Simple Logging Facade for Java)** backed by Logback or Log4j2:

- **Log Levels Hierarchy**:
  \`TRACE\` < \`DEBUG\` < \`INFO\` < \`WARN\` < \`ERROR\`
- **Parameterized Logging**: Use placeholders \`{}\` instead of String concatenation to avoid unnecessary memory allocations when debug logging is disabled.
- **MDC (Mapped Diagnostic Context)**: Attaches correlation IDs / trace IDs across asynchronous log lines.`,
        keyPoints: [
          "Never use System.out.println() in production server applications.",
          "Use log.error('Failed to process payment for user: {}', userId, exception) to log stack traces."
        ],
        codeExample: {
          filename: "PaymentService.java",
          code: `import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    public void processPayment(String orderId, double amount) {
        MDC.put("traceId", "TRX-" + System.currentTimeMillis());
        log.info("Processing order: {} for amount: USD {}", orderId, amount);
        
        try {
            // charge card
        } catch (Exception e) {
            log.error("Payment failed for order: {}", orderId, e);
        } finally {
            MDC.clear();
        }
    }
}`,
          output: `2026-08-31 18:00:00.123 [main] [TRX-179870000] INFO com.devhub.PaymentService - Processing order: ORD-8491 for amount: $99.0`
        },
        notes: ["Structured JSON logging enables log aggregators like Elasticsearch, Datadog, and Grafana Loki to index fields."],
        commonMistakes: [{ title: "Using string concatenation inside log.debug()", desc: "log.debug('Value is: ' + computeExpensiveString()) wastes CPU even if DEBUG is disabled. Use placeholders: log.debug('Value is: {}', val)." }],
        tryIt: { prompt: "Lombok logging annotation:", code: `@Slf4j\npublic class MyService { void test() { log.info("Ready"); } }`, hint: "@Slf4j automatically generates private static final Logger log field." }
      }
    ]
  },

  // 21. Spring Boot MongoDB Full Project
  {
    id: "mod-21",
    moduleNumber: 21,
    title: "Spring Boot MongoDB Project",
    slug: "spring-boot-mongodb",
    category: "Spring Boot Ecosystem",
    categoryId: "spring-boot",
    videoTimestamp: "47:18:23",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=170303s",
    description: "NoSQL document persistence with MongoRepository, MongoTemplate, @Document, embedded documents, and aggregation pipelines.",
    lessonsCount: 2,
    xpReward: 270,
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-21-1",
        title: "MongoRepository, Document Schemas & Aggregations",
        description: "Persist JSON documents, index fields, execute aggregation pipelines, and build a full NoSQL project.",
        duration: "15 min",
        quizId: "quiz-21-1",
        videoTimestamp: "47:18:23",
        concept: `MongoDB is a distributed, document-oriented NoSQL database:

- **BSON Documents**: Flexible, polymorphic JSON-like schemas.
- **Spring Data MongoDB**:
  - \`@Document(collection = "quizzes")\`: Maps a Java class to a MongoDB collection.
  - \`@Id\`: Maps the primary identifier (e.g. \`String id\` or \`ObjectId\`).
  - \`@Indexed\`: Creates database indices on high-query fields.
  - \`MongoRepository<Quiz, String>\`: Provides automatic query generation.`,
        keyPoints: [
          "MongoDB is ideal for hierarchical, polymorphic data models (like quizzes, comments, product catalogs).",
          "MongoTemplate provides complex criteria queries and multi-stage aggregation pipelines ($match, $group, $sort)."
        ],
        codeExample: {
          filename: "QuizDocument.java",
          code: `import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.*;
import java.util.List;

@Document(collection = "quizzes")
public record QuizDocument(
    @Id String id,
    @Indexed String lessonId,
    String title,
    int xpReward,
    List<QuestionItem> questions
) {
    public record QuestionItem(String prompt, List<String> options, int correctIndex) {}
}`,
          output: `// Stored in MongoDB: {_id: ObjectId("..."), lessonId: "lesson-1-1", title: "...", questions: [...]}`
        },
        notes: ["MongoDB does not enforce relational foreign key constraints; integrity is managed at the application layer."],
        commonMistakes: [{ title: "Treating MongoDB like a relational database with manual table joins", desc: "NoSQL models embed related child data directly inside parent documents for high-speed single-read access." }],
        tryIt: { prompt: "Find by nested field in MongoRepository:", code: `List<QuizDocument> findByQuestionsCorrectIndex(int idx);`, hint: "Spring Data MongoDB supports deep querying into nested array elements." }
      }
    ]
  },

  // 22. Docker for Java Developers
  {
    id: "mod-22",
    moduleNumber: 22,
    title: "Docker for Java Developers",
    slug: "docker-java",
    category: "DevOps & Cloud",
    categoryId: "devops-cloud",
    videoTimestamp: "49:30:26",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=178226s",
    description: "Multi-stage Docker builds, Alpine/Distroless JRE images, Docker Compose for local PostgreSQL/Kafka, and memory cgroups.",
    lessonsCount: 2,
    xpReward: 280,
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-22-1",
        title: "Multi-Stage Dockerfile & Docker Compose Setup",
        description: "Package lightweight production containers with JRE 21, non-root users, and multi-service orchestration.",
        duration: "15 min",
        quizId: "quiz-22-1",
        videoTimestamp: "49:30:26",
        concept: `Docker containers package Java applications and their runtime environment into immutable, reproducible artifacts:

- **Multi-Stage Build**:
  1. **Build Stage**: Uses full JDK 21 image + Maven/Gradle to compile source code and run tests.
  2. **Runtime Stage**: Copies only the final compiled JAR into a minimal, hardened JRE / Distroless image (~150MB vs ~800MB).
- **JVM Container Awareness**: Modern JVMs (Java 17/21) automatically detect container CPU limits and memory cgroups (\`-XX:MaxRAMPercentage=75.0\`).`,
        keyPoints: [
          "Run containers as non-root users (USER appuser) for container security compliance.",
          "Docker Compose orchestrates microservices, PostgreSQL databases, and Kafka message brokers locally with one command."
        ],
        codeExample: {
          filename: "Dockerfile",
          code: `# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]`,
          output: `Step 9/9 : Successfully built container image (162MB)`
        },
        notes: ["Use .dockerignore to exclude target/, .git/, and local secrets from container build context."],
        commonMistakes: [{ title: "Hardcoding -Xmx without container cgroup awareness", desc: "Setting static -Xmx1g can cause Kubernetes OOMKilled errors if container memory limit is also 1GB. Use -XX:MaxRAMPercentage instead." }],
        tryIt: { prompt: "Launch multi-container stack in background:", code: `docker compose up -d`, hint: "Runs all defined database and backend containers in detached daemon mode." }
      }
    ]
  },

  // 23. Cloud Deployment
  {
    id: "mod-23",
    moduleNumber: 23,
    title: "Cloud Deployment (AWS & GCP)",
    slug: "cloud-deployment",
    category: "DevOps & Cloud",
    categoryId: "devops-cloud",
    videoTimestamp: "51:00:41",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=183641s",
    description: "AWS ECS/EKS, Cloud Run, RDS PostgreSQL, IAM security, environment variables, health checks (Actuator), and blue-green deployments.",
    lessonsCount: 2,
    xpReward: 280,
    difficulty: "Advanced",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-23-1",
        title: "Spring Boot Actuator Health Probes & Cloud Architecture",
        description: "Configure liveness/readiness probes, RDS database credentials via Secrets Manager, and container deployments.",
        duration: "15 min",
        quizId: "quiz-23-1",
        videoTimestamp: "51:00:41",
        concept: `Deploying enterprise Spring Boot applications to AWS/GCP cloud environments:

1. **Spring Boot Actuator Probes**:
   - \`/actuator/health/liveness\`: Tells Kubernetes / ECS if the JVM is running or stuck in deadlock.
   - \`/actuator/health/readiness\`: Verifies DB connections and caches are ready to accept traffic.
2. **Cloud Best Practices (12-Factor App)**:
   - Inject database credentials via Cloud Secrets Manager & environment variables.
   - Store session state in Redis or use stateless JWTs.
   - Use managed database services (AWS RDS, GCP Cloud SQL) with automated failover.`,
        keyPoints: [
          "Never bake passwords or API tokens into container images.",
          "Blue-Green and Canary deployments ensure zero-downtime rolling upgrades."
        ],
        codeExample: {
          filename: "application-prod.yml",
          code: `management:
  endpoints:
    web:
      exposure:
        include: health, info, metrics, prometheus
  endpoint:
    health:
      probes:
        enabled: true
      show-details: when-authorized

spring:
  datasource:
    url: SPRING_DATASOURCE_URL
    username: SPRING_DATASOURCE_USERNAME
    password: SPRING_DATASOURCE_PASSWORD`,
          output: `GET /actuator/health/liveness -> {"status": "UP"}`
        },
        notes: ["Enable Prometheus metrics endpoint in Actuator for real-time Grafana dashboards."],
        commonMistakes: [{ title: "Exposing all Actuator management endpoints publicly", desc: "Exposing /actuator/env or /actuator/beans to the public internet leaks server configurations and environment variables." }],
        tryIt: { prompt: "Liveness probe purpose in cloud container orchestrator:", code: `Restarts the container if the application becomes unresponsive or deadlocked.`, hint: "Readiness controls traffic routing; Liveness controls container restart lifecycle." }
      }
    ]
  },

  // 24. Spring AI
  {
    id: "mod-24",
    moduleNumber: 24,
    title: "Spring AI & Generative AI",
    slug: "spring-ai",
    category: "Spring AI & GenAI",
    categoryId: "spring-ai",
    videoTimestamp: "51:47:59",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=186479s",
    description: "ChatClient, Prompts, OutputParsers, Function Calling, Vector Databases (PgVector), and Retrieval-Augmented Generation (RAG).",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 40,
    lessons: [
      {
        id: "lesson-24-1",
        title: "ChatClient, Structured Outputs & RAG Pipelines",
        description: "Integrate LLMs into Spring Boot with ChatClient, system prompts, vector stores, and automated embeddings.",
        duration: "15 min",
        quizId: "quiz-24-1",
        videoTimestamp: "51:47:59",
        concept: `**Spring AI** brings portable Generative AI integration to Java enterprise systems:

- **ChatClient / ChatModel**: Portable abstraction across OpenAI, Anthropic Claude, Google Gemini, Ollama, and Azure OpenAI.
- **Structured Output Parsers**: Automatically maps raw LLM text responses into structured Java records.
- **RAG (Retrieval-Augmented Generation)**:
  1. Ingest Java documentation / knowledge base.
  2. Generate vector embeddings.
  3. Store in Vector Database (PgVector, Qdrant, Chroma).
  4. Perform semantic similarity search and inject context into the LLM prompt.`,
        keyPoints: [
          "ChatClient.builder(chatModel).build() provides a fluent query builder API.",
          "Spring AI supports Function Calling: LLMs can invoke local Spring @Bean methods dynamically to execute real actions."
        ],
        codeExample: {
          filename: "JavaTutorService.java",
          code: `import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class JavaTutorService {
    private final ChatClient chatClient;

    public JavaTutorService(ChatClient.Builder builder) {
        this.chatClient = builder
            .defaultSystem("You are DevHub AI, an expert Java 21 coding assistant.")
            .build();
    }

    public String explainBug(String javaCode) {
        return chatClient.prompt()
            .user(u -> u.text("Spot the bug in this code:\n{code}").param("code", javaCode))
            .call()
            .content();
    }
}`,
          output: `AI Response: "The error on Line 4 is caused by off-by-one array index boundary: i <= arr.length..."`
        },
        notes: ["VectorStore.similaritySearch(query) finds the most relevant document chunks based on cosine distance."],
        commonMistakes: [{ title: "Hardcoding API keys in application source files", desc: "Always provide AI API keys via environment variables like export SPRING_AI_OPENAI_API_KEY=sk-..." }],
        tryIt: { prompt: "Structured entity extraction with Spring AI:", code: `QuizResult result = chatClient.prompt().user("Grade this quiz").call().entity(QuizResult.class);`, hint: ".entity(Class) uses BeanOutputConverter to parse JSON into Java records." }
      }
    ]
  },

  // 25. DeepSeek Open Source Using Ollama and Spring AI
  {
    id: "mod-25",
    moduleNumber: 25,
    title: "DeepSeek Open Source with Ollama & Spring AI",
    slug: "deepseek-ollama-spring-ai",
    category: "Spring AI & GenAI",
    categoryId: "spring-ai",
    videoTimestamp: "52:08:08",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=187688s",
    description: "Run local open-source LLMs (DeepSeek-R1, DeepSeek-Coder) using Ollama, zero-cost privacy, and Spring AI Ollama starter.",
    lessonsCount: 2,
    xpReward: 300,
    difficulty: "Advanced",
    estimatedMinutes: 35,
    lessons: [
      {
        id: "lesson-25-1",
        title: "Local DeepSeek Reasoning Models with Spring AI",
        description: "Connect Spring Boot to locally hosted DeepSeek-R1 / DeepSeek-Coder models via Ollama with 100% data privacy.",
        duration: "15 min",
        quizId: "quiz-25-1",
        videoTimestamp: "52:08:08",
        concept: `Running open-source models locally eliminates cloud API costs and keeps proprietary enterprise code 100% private:

- **Ollama**: A lightweight local LLM execution engine running models on Mac, Linux, and Windows with GPU acceleration.
- **DeepSeek-R1 / DeepSeek-Coder**: State-of-the-art open-source reasoning models specifically optimized for code generation, mathematical analysis, and complex reasoning chains.
- **spring-ai-ollama-spring-boot-starter**: Connects Spring Boot applications to the local Ollama daemon (\`http://localhost:11434\`).`,
        keyPoints: [
          "Run 'ollama run deepseek-r1:8b' in terminal to pull and serve the model locally.",
          "Zero telemetry or cloud network calls: all code analysis runs entirely on local machine hardware."
        ],
        codeExample: {
          filename: "application.yml",
          code: `spring:
  ai:
    ollama:
      base-url: http://localhost:11434
      chat:
        model: deepseek-r1:8b
        options:
          temperature: 0.2
          num-ctx: 8192`,
          output: `[Spring AI] Connected to local Ollama daemon hosting deepseek-r1:8b.`
        },
        notes: ["DeepSeek-R1 includes reasoning traces in <think> tags before outputting final answers."],
        commonMistakes: [{ title: "Running 70B models without adequate VRAM", desc: "Choose quantized models matching your GPU/RAM (e.g. 7B/8B models for 16GB RAM laptops)." }],
        tryIt: { prompt: "Stream local DeepSeek AI responses to frontend:", code: `Flux<String> stream = chatClient.prompt().user("Explain Java memory").stream().content();`, hint: "Spring AI seamlessly supports reactive streaming with WebFlux." }
      }
    ]
  },

  // 26. Microservices
  {
    id: "mod-26",
    moduleNumber: 26,
    title: "Microservices Architecture",
    slug: "microservices",
    category: "Microservices & Kafka",
    categoryId: "microservices-kafka",
    videoTimestamp: "54:15:20",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=195320s",
    description: "Service Discovery (Eureka / Consul), API Gateway (Spring Cloud Gateway), Resilience4j Circuit Breakers, and OpenFeign.",
    lessonsCount: 2,
    xpReward: 320,
    difficulty: "Advanced",
    estimatedMinutes: 45,
    lessons: [
      {
        id: "lesson-26-1",
        title: "Spring Cloud Gateway, Circuit Breakers & Service Mesh",
        description: "Master routing, rate limiting, Resilience4j fallback patterns, and declarative OpenFeign clients.",
        duration: "15 min",
        quizId: "quiz-26-1",
        videoTimestamp: "54:15:20",
        concept: `Microservices architecture decomposes monolithic applications into independent, loosely-coupled distributed services:

- **Spring Cloud Gateway**: Central entry point handling routing, authentication, SSL termination, and rate limiting.
- **Service Registry (Eureka / Consul)**: Dynamic discovery of microservice instances without hardcoding IP addresses.
- **Resilience4j Circuit Breaker**:
  - **CLOSED**: Normal operation; requests pass through.
  - **OPEN**: Error rate exceeds threshold; immediately returns fallback without hammering the downstream service.
  - **HALF-OPEN**: Tests trial requests to determine if downstream service has recovered.`,
        keyPoints: [
          "@FeignClient provides declarative REST clients between microservices.",
          "Distributed Tracing (Micrometer + OpenTelemetry + Zipkin) tracks requests across service boundaries."
        ],
        codeExample: {
          filename: "PaymentClient.java",
          code: `import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@FeignClient(name = "payment-service")
public interface PaymentClient {

    @PostMapping("/api/v1/payments")
    @CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
    PaymentResponse processPayment(@RequestBody PaymentRequest request);

    default PaymentResponse paymentFallback(PaymentRequest request, Throwable ex) {
        return new PaymentResponse("PENDING_OFFLINE_QUEUE", "Payment queued for background retry");
    }
}`,
          output: `[Circuit Breaker] Fallback triggered gracefully during network partition.`
        },
        notes: ["Always implement idempotency keys for distributed transactions."],
        commonMistakes: [{ title: "Cascading failures without circuit breakers", desc: "A slow downstream service exhausts connection pools across all calling microservices without timeouts and circuit breakers." }],
        tryIt: { prompt: "Circuit Breaker state transitions:", code: `CLOSED -> OPEN (on high error rate) -> HALF-OPEN (testing health) -> CLOSED`, hint: "Prevents catastrophic cascading failures in distributed architectures." }
      }
    ]
  },

  // 27. Spring Boot + Kafka
  {
    id: "mod-27",
    moduleNumber: 27,
    title: "Event-Driven Architecture with Kafka",
    slug: "spring-boot-kafka",
    category: "Microservices & Kafka",
    categoryId: "microservices-kafka",
    videoTimestamp: "55:34:32",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=200072s",
    description: "Kafka Topics, Partitions, Consumer Groups, Producer with KafkaTemplate, @KafkaListener, and Dead Letter Queues (DLQ).",
    lessonsCount: 2,
    xpReward: 320,
    difficulty: "Advanced",
    estimatedMinutes: 40,
    lessons: [
      {
        id: "lesson-27-1",
        title: "Kafka Producers, Consumer Groups & DLQ Handling",
        description: "Build high-throughput event streaming systems with KafkaTemplate, offset commits, and Dead Letter Topics.",
        duration: "15 min",
        quizId: "quiz-27-1",
        videoTimestamp: "55:34:32",
        concept: `Apache Kafka is a distributed, horizontally-scalable event streaming platform:

- **Topics & Partitions**: Messages are published to topics, divided into ordered, immutable log partitions for parallel processing.
- **Producers**: Publish event records using \`KafkaTemplate.send("quiz-completed-topic", key, event)\`.
- **Consumer Groups**: Multiple consumers share partition reading; if a consumer dies, partitions are rebalanced automatically.
- **Dead Letter Queue (DLQ)**: Poison pill messages that repeatedly fail deserialization or business processing are routed to a \`.DLT\` topic for inspection.`,
        keyPoints: [
          "Consumer offset commits track reading progress in the __consumer_offsets internal topic.",
          "Messages with the same message key are guaranteed to land on the exact same partition, ensuring in-order processing."
        ],
        codeExample: {
          filename: "QuizEventConsumer.java",
          code: `import org.springframework.kafka.annotation.*;
import org.springframework.stereotype.Service;

@Service
public class QuizEventConsumer {

    @RetryableTopic(attempts = "3", backoff = @Backoff(delay = 1000, multiplier = 2.0))
    @KafkaListener(topics = "quiz-completed", groupId = "analytics-group")
    public void handleQuizCompletion(QuizCompletedEvent event) {
        System.out.println("Processing XP reward: " + event.xpEarned() + " for user: " + event.userId());
        if (event.userId() == null) throw new IllegalArgumentException("Invalid user ID");
    }

    @DltHandler
    public void handleDlt(QuizCompletedEvent event) {
        System.err.println("Message moved to Dead Letter Queue: " + event);
    }
}`,
          output: `Processing XP reward: 80 for user: user-491`
        },
        notes: ["Kafka messages are persisted to disk and replicated across brokers for fault tolerance."],
        commonMistakes: [{ title: "Assuming global ordering across all partitions in a topic", desc: "Kafka guarantees strict message ordering only within a single partition, not across multiple partitions." }],
        tryIt: { prompt: "Publish event asynchronously in Spring Kafka:", code: `kafkaTemplate.send("orders", orderId, orderPayload);`, hint: "Returns CompletableFuture<SendResult> for non-blocking confirmation." }
      }
    ]
  },

  // 28. Linux
  {
    id: "mod-28",
    moduleNumber: 28,
    title: "Linux for Java Developers",
    slug: "linux",
    category: "DevOps & Cloud",
    categoryId: "devops-cloud",
    videoTimestamp: "57:10:25",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=205825s",
    description: "Essential bash commands, process management (ps, top, kill), permissions (chmod, chown), systemd services, and JVM diagnostics (jcmd, jstack).",
    lessonsCount: 1,
    xpReward: 200,
    difficulty: "Beginner to Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-28-1",
        title: "Linux Command Line, Systemd & JVM Diagnostics",
        description: "Master grep, find, curl, systemctl, htop, and troubleshooting live JVMs with jcmd & jstack.",
        duration: "15 min",
        quizId: "quiz-28-1",
        videoTimestamp: "57:10:25",
        concept: `Linux powers 95%+ of production enterprise Java server environments:

Key Developer Tooling:
- **File & Search**: \`grep -rn "NullPointer" /var/log/app/\`, \`find / -name "*.jar"\`, \`tail -f app.log\`.
- **Process & Performance**: \`top\`, \`htop\`, \`ps aux | grep java\`, \`kill -15 <pid>\` (graceful SIGTERM).
- **Systemd Services**: Manage background daemons via \`systemctl start/stop/status myapp.service\`.
- **JVM Diagnostics**:
  - \`jcmd <pid> Thread.print\`: Generates thread dump to diagnose deadlocks.
  - \`jcmd <pid> GC.heap_info\`: Inspects heap memory usage on live production systems.`,
        keyPoints: [
          "File permissions: chmod 755 (rwxr-xr-x), chown appuser:appgroup.",
          "Use kill -15 (SIGTERM) for graceful Spring Boot shutdown; avoid kill -9 unless process is unresponsive."
        ],
        codeExample: {
          filename: "TroubleshootJVM.sh",
          code: `# Inspect active Java process PID
ps -ef | grep java

# Monitor memory and CPU utilization
htop

# Capture thread dump of live JVM
jcmd 12489 Thread.print > /tmp/threaddump.txt

# Inspect open network ports
netstat -tulpn | grep 8080`,
          output: `tcp6 0 0 :::8080 :::* LISTEN 12489/java`
        },
        notes: ["Always check disk space with 'df -h' and inode capacity with 'df -i' when applications crash unexpectedly."],
        commonMistakes: [{ title: "Running production Java applications as root user", desc: "Running as root allows attackers who exploit vulnerabilities full control over the host OS." }],
        tryIt: { prompt: "Tail follow application log lines in real time:", code: `tail -f -n 100 /var/log/devhub/app.log`, hint: "-f follows the log file as new lines are appended by the application." }
      }
    ]
  },

  // 29. Ansible
  {
    id: "mod-29",
    moduleNumber: 29,
    title: "Ansible Configuration Management",
    slug: "ansible",
    category: "DevOps & Cloud",
    categoryId: "devops-cloud",
    videoTimestamp: "58:56:44",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=212204s",
    description: "Idempotent playbooks, inventory files, YAML syntax, roles, handlers, and automated Java 21 server provisioning.",
    lessonsCount: 1,
    xpReward: 220,
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    lessons: [
      {
        id: "lesson-29-1",
        title: "Ansible Playbooks & Automated JDK Provisioning",
        description: "Automate server configuration over agentless SSH with idempotent YAML playbooks.",
        duration: "15 min",
        quizId: "quiz-29-1",
        videoTimestamp: "58:56:44",
        concept: `Ansible is an **agentless** configuration management tool that operates over standard SSH:

- **Idempotence**: Running a playbook 10 times produces the exact same system state as running it once; tasks are executed only if changes are required.
- **Core Components**:
  - **Inventory**: Lists target server IPs and groups (\`[webservers]\`, \`[databases]\`).
  - **Playbooks**: YAML files defining desired configuration tasks.
  - **Modules**: Built-in actions (\`apt\`, \`yum\`, \`copy\`, \`systemd\`, \`user\`).
  - **Roles**: Reusable, organized playbook directory structures.`,
        keyPoints: [
          "Agentless: Requires only Python and SSH on the target server nodes.",
          "Handlers: Tasks triggered only when a preceding task reports 'changed' state (e.g. restart service on config update)."
        ],
        codeExample: {
          filename: "provision-java.yml",
          code: `---
- name: Provision Java 21 Application Server
  hosts: webservers
  become: true
  tasks:
    - name: Install OpenJDK 21
      apt:
        name: openjdk-21-jdk-headless
        state: present
        update_cache: yes

    - name: Create application service user
      user:
        name: devhub
        shell: /bin/false

    - name: Copy production JAR binary
      copy:
        src: target/devhub-app.jar
        dest: /opt/devhub/app.jar
        owner: devhub
        group: devhub
        mode: '0755'
      notify: Restart DevHub Service

  handlers:
    - name: Restart DevHub Service
      systemd:
        name: devhub
        state: restarted`,
          output: `PLAY RECAP *************************************************\nserver1 : ok=4 changed=2 unreachable=0 failed=0`
        },
        notes: ["Ansible Vault encrypts sensitive passwords and SSH keys stored in version control."],
        commonMistakes: [{ title: "Using shell or command modules instead of declarative modules", desc: "Using 'command: apt install' breaks idempotence; always use declarative modules like 'apt: name=... state=present'." }],
        tryIt: { prompt: "Run Ansible playbook against production inventory:", code: `ansible-playbook -i inventory.ini provision-java.yml`, hint: "Executes defined configuration tasks across all target inventory hosts." }
      }
    ]
  },

  // 30. Jenkins
  {
    id: "mod-30",
    moduleNumber: 30,
    title: "Jenkins CI/CD Pipelines",
    slug: "jenkins",
    category: "DevOps & Cloud",
    categoryId: "devops-cloud",
    videoTimestamp: "60:13:33",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=216813s",
    description: "Declarative Jenkinsfile, multi-branch pipelines, build stages (Compile, Test, SonarQube, Docker, Deploy), and webhooks.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Intermediate",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-30-1",
        title: "Declarative Jenkinsfile & Automated Deployment Pipeline",
        description: "Build robust CI/CD pipelines with automated test gates, Docker packaging, and environment promotions.",
        duration: "15 min",
        quizId: "quiz-30-1",
        videoTimestamp: "60:13:33",
        concept: `Jenkins is the industry standard open-source CI/CD automation server:

- **Pipeline-as-Code (Jenkinsfile)**: Version-controlled pipeline definition checked into the Git repository.
- **Declarative Pipeline Stages**:
  1. \`Checkout\`: Clones Git repository.
  2. \`Build\`: Compiles source code with Maven/Gradle.
  3. \`Test\`: Executes JUnit test suite and code coverage reports.
  4. \`Security & QA\`: SonarQube static analysis and dependency vulnerability scans.
  5. \`Docker Build & Push\`: Packages container image and pushes to Amazon ECR / Docker Hub.
  6. \`Deploy\`: Triggers rolling deployment to staging/production clusters.`,
        keyPoints: [
          "Post actions (post { always {}, success {}, failure {} }) handle automated notifications (Slack, Email).",
          "Jenkins credentials store safely injects API tokens and private keys into environment variables."
        ],
        codeExample: {
          filename: "Jenkinsfile",
          code: `pipeline {
    agent { docker { image 'maven:3.9.6-eclipse-temurin-21' } }
    
    stages {
        stage('Compile & Test') {
            steps {
                sh 'mvn clean verify'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }
        stage('Docker Package') {
            when { branch 'main' }
            steps {
                sh 'docker build -t devhub/api:latest .'
                sh 'docker push devhub/api:latest'
            }
        }
    }
}`,
          output: `[Pipeline] Stage (Compile & Test) succeeded in 42s\n[Pipeline] Finished: SUCCESS`
        },
        notes: ["Use Multibranch Pipelines in Jenkins to automatically detect and test all active pull request branches."],
        commonMistakes: [{ title: "Failing to fail the build on broken test cases", desc: "Ensure test failures properly return non-zero exit codes to block bad code from deploying to production." }],
        tryIt: { prompt: "Trigger Jenkins build automatically on git push:", code: `Configure GitHub Webhook pointing to http://jenkins-host/github-webhook/`, hint: "Webhooks notify Jenkins instantly when new commits are pushed." }
      }
    ]
  },

  // 31. Terraform
  {
    id: "mod-31",
    moduleNumber: 31,
    title: "Terraform (Infrastructure as Code)",
    slug: "terraform",
    category: "DevOps & Cloud",
    categoryId: "devops-cloud",
    videoTimestamp: "60:13:33",
    videoUrl: "https://www.youtube.com/watch?v=q6z_UCBM5Ek&t=216813s",
    description: "HCL syntax, providers (AWS, Azure, GCP), resources, variables, state management (tfstate), and terraform plan / apply.",
    lessonsCount: 1,
    xpReward: 250,
    difficulty: "Advanced",
    estimatedMinutes: 30,
    lessons: [
      {
        id: "lesson-31-1",
        title: "Terraform HCL, Remote State & Cloud Infrastructure",
        description: "Provision AWS VPCs, ECS clusters, and RDS PostgreSQL databases using HashiCorp Configuration Language (HCL).",
        duration: "15 min",
        quizId: "quiz-31-1",
        videoTimestamp: "60:13:33",
        concept: `Terraform is an open-source **Infrastructure as Code (IaC)** tool by HashiCorp:

- **Declarative HCL**: You declare the *desired end state* of infrastructure; Terraform calculates what needs to be created, updated, or destroyed.
- **Workflow**:
  1. \`terraform init\`: Downloads cloud provider plugins (AWS, GCP).
  2. \`terraform plan\`: Generates execution plan showing exact infrastructure diffs (+ create, ~ update, - destroy).
  3. \`terraform apply\`: Executes plan to provision real cloud resources.
  4. \`terraform destroy\`: Tears down all resources cleanly.
- **Terraform State (terraform.tfstate)**: Tracks real-world cloud resource IDs; stored remotely in Amazon S3 with DynamoDB state locking.`,
        keyPoints: [
          "Immutable Infrastructure: Replace servers with new configurations instead of mutating live instances.",
          "Modules allow reusable infrastructure blueprints across development, staging, and production environments."
        ],
        codeExample: {
          filename: "main.tf",
          code: `terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Provision PostgreSQL RDS for Spring Boot
resource "aws_db_instance" "devhub_db" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = "db.t4g.micro"
  db_name              = "devhub"
  username             = "dbadmin"
  password             = var.db_password
  skip_final_snapshot  = true
}`,
          output: `Plan: 1 to add, 0 to change, 0 to destroy.\nApply complete! Resources: 1 added, 0 changed, 0 destroyed.`
        },
        notes: ["Never commit local terraform.tfstate or terraform.tfvars containing secrets to Git."],
        commonMistakes: [{ title: "Editing cloud resources manually in AWS Console", desc: "Manual changes cause 'State Drift'; Terraform will revert or conflict on the next terraform apply." }],
        tryIt: { prompt: "Inspect what changes Terraform will make before applying:", code: `terraform plan`, hint: "terraform plan previews all infrastructure additions, modifications, and deletions." }
      }
    ]
  }
];

import { ML_MODULES, ML_COURSE_CATEGORIES } from './mockMLCourseData';
import { VERILOG_MODULES, VERILOG_COURSE_CATEGORIES } from './mockVerilogCourseData';

export { ML_MODULES, ML_COURSE_CATEGORIES, VERILOG_MODULES, VERILOG_COURSE_CATEGORIES };

export const ALL_TRACKS = [
  { id: "all", name: "All Tracks", description: "Explore Java Full Stack + Machine Learning & AI + Verilog HDL (58 Modules Total)", count: 58 },
  { id: "java", name: "Java Full Stack & Cloud Track", description: "Core Java 21, Spring Boot 3.2, Kafka, Docker & Kubernetes (31 Modules)", count: 31 },
  { id: "ml", name: "Machine Learning & AI Track", description: "Python, PyTorch, Transformers, LLMs, RAG & MLOps (15 Modules)", count: 15 },
  { id: "verilog", name: "Verilog HDL & Digital VLSI Track", description: "Verilog HDL, FSMs, Dual-Clock Async FIFO, BRAM & FPGA Timing Closure (12 Modules)", count: 12 },
];

export const ALL_MODULES = [
  ...JAVA_MODULES.map(m => ({ ...m, track: 'java' })),
  ...ML_MODULES.map(m => ({ ...m, track: 'ml' })),
  ...VERILOG_MODULES.map(m => ({ ...m, track: 'verilog' }))
];

export const getModuleById = (moduleId) => {
  return ALL_MODULES.find(m => m.id === moduleId) || JAVA_MODULES[0];
};

export const getModulesByTrack = (track = 'all') => {
  if (track === 'java') return JAVA_MODULES;
  if (track === 'ml') return ML_MODULES;
  if (track === 'verilog') return VERILOG_MODULES;
  return ALL_MODULES;
};

