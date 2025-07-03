import {
  FEATURE2_IMAGE,
  classic,
  modern,
  trendy,
} from "../../constants/images";

export const translations = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      about: "About",
      services: "Services",
      packages: "Packages",
      courses: "Courses",
      blog: "Blog",
      contact: "Contact",
      login: "Login",
      logout: "Logout",

      // Admin
      dashboard: "Dashboard",
      projects: "Projects",
      consultations: "Consultations",
      manageProjects: "Manage Projects",
      manageBlog: "Manage Blog",
      manageConsultations: "Manage Consultations",

      // Common
      readMore: "Read More",
      learnMore: "Learn More",
      viewAll: "View All",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      create: "Create",
      update: "Update",
      search: "Search",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Information",
      backToHome: "Back to Home",

      // Page Titles
      pageTitle: {
        blogs: "Blogs",
        courses: "Courses",
        costCalculator: "Cost Calculator",
      },

      // Blogs List Page
      blogsListPage: {
        categoryTitle: "{{category}} Blogs",
        latestBlogsTitle: "Latest Blogs",
        categoryDescription:
          "Explore our collection of {{category}} related articles and insights.",
        latestBlogsDescription:
          "Discover our latest articles, insights, and updates from the construction industry.",
      },

      // Forms
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      phone: "Phone",
      message: "Message",
      subject: "Subject",
      description: "Description",
      title: "Title",
      category: "Category",
      location: "Location",
      budget: "Budget",
      status: "Status",
      date: "Date",

      // Validation
      required: "{{field}} is required",
      invalidEmail: "Please enter a valid email",
      passwordLength: "Password must be at least 6 characters",
      passwordMatch: "Passwords do not match",
      invalidPhone: "Please enter a valid phone number",

      // Messages
      loginSuccess: "Logged in successfully",
      logoutSuccess: "Logged out successfully",
      registerSuccess: "Registered successfully",
      updateSuccess: "Updated successfully",
      deleteSuccess: "Deleted successfully",
      createSuccess: "Created successfully",
      errorOccurred: "An error occurred",
      tryAgain: "Please try again",
      noData: "No data available",
      noResults: "No results found",

      // Login Page
      loginPage: {
        welcomeBack: "Welcome Back",
        createAccount: "create a new account",
        emailLabel: "Email address",
        emailPlaceholder: "Enter your email",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        signIn: "Sign in",
        signingIn: "Signing in...",
        enterBothFields: "Please enter both email and password",
        invalidCredentials: "Invalid email or password",
        accountBlocked:
          "Your account has been blocked.\n\nReason for block:\n{{reason}}\n\n{{expiresAt}}",
        noReasonProvided: "No reason provided",
        permanentBlock: "This is a permanent block",
        blockExpiresAt: "Block duration: {{date}}",
      },

      // Register Page
      registerPage: {
        createAccount: "Create your account",
        signInToAccount: "sign in to your account",
        fullNameLabel: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        emailLabel: "Email address",
        emailPlaceholder: "Enter your email",
        phoneLabel: "Phone Number",
        phonePlaceholder: "Enter your phone number",
        passwordLabel: "Password",
        passwordPlaceholder: "Create a password",
        confirmPasswordLabel: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm your password",
        termsAgreement: "By creating an account, you agree to our",
        termsOfService: "Terms of Service",
        and: "and",
        privacyPolicy: "Privacy Policy",
        createAccountButton: "Create Account",
        creatingAccount: "Creating Account...",
        // Validation messages
        passwordLength: "Password must be at least 8 characters long",
        passwordsDoNotMatch: "Passwords do not match",
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        phoneRequired: "Phone is required",
        invalidEmail: "Please enter a valid email address",
        registrationFailed: "Failed to register. Please try again.",
        registrationSuccess: "Registration successful!",
      },

      // Update Details Page
      updateDetailsPage: {
        title: "Update Your Details",
        subtitle: "Update your personal information",
        fullNameLabel: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email",
        phoneLabel: "Phone Number",
        phonePlaceholder: "Enter your phone number",
        profilePictureLabel: "Profile Picture",
        profilePreviewAlt: "Profile Preview",
        fileInputLabel: "Choose a file",
        selectedFile: "Selected: {{fileName}}",
        previewReady: "Preview ready - submit to save",
        cancelButton: "Cancel",
        updateButton: "Update Profile",
        updatingButton: "Updating Profile...",
        // Messages
        loadError: "Failed to load user data",
        updateSuccess: "Details updated successfully!",
        updateError: "Failed to update details",
        unauthorized: "Unauthorized",
      },

      // English translations
      common: {
        visitor: "Visitor",
        tryAgain: "Try Again",
        notProvided: "Not provided",
        admin: "Admin",
        active: "Active",
        unknown: "Unknown",
        delete: "delete",
        cancel: "cancel",
      },
      blogDetail: {
        loadError: "Failed to load blog",
        feedbackError: "Failed to submit feedback",
        notFound: "Blog not found",
        backToBlogs: "Back to Blogs",
        unknownAuthor: "Unknown Author",
        category: "Category",
        feedbackAndRatings: "Feedback & Ratings",
        ratingOutOfFive: "{{rating}} out of 5",
        reviews: "({{count}} reviews)",
        writeAReview: "Write a Review",
        noFeedback: "No feedback yet. Be the first to review!",
        noTestimonials: "No testimonials available yet.",
        dateFormat: "{{date}}",
      },
      courseDetail: {
        loadError: "Failed to load course details",
        enrollError: "Failed to update enrollment status",
        feedbackError: "Failed to submit feedback",
        notFound: "Course not found",
        backToCourses: "Back to Courses",
        description: "Description",
        whatYoullLearn: "What You'll Learn",
        requirements: "Requirements",
        minutes: "{{count}} minutes",
        videoLink: "video link",
        noCurriculum: "No curriculum available yet.",
        unknownInstructor: "Unknown Instructor",
        ratingOutOfFive: "{{rating}} out of 5",
        reviews: "({{count}} reviews)",
        writeAReview: "Write a Review",
        noFeedback: "No feedback yet. Be the first to review!",
        noImage: "No Image",
        hoursOfContent: "{{count}} hours of content",
        studentsEnrolled: "{{count}} students enrolled",
        status: "Active",
        tab: {
          overview: "Overview",
          curriculum: "Curriculum",
          instructor: "Instructor",
          feedback: "Feedback",
        },
        free: "Free",
        unenrollButton: "Unenroll from Course",
        notAvailableButton: "Course Not Available",
        loginToEnrollButton: "Login to Enroll",
        enrollNowButton: "Enroll Now",
        modulesCount: "{{count}} modules",
      },
      blogsList: {
        loadError: "Failed to load blogs",
        allBlogs: "All Blogs",
        popularBlogs: "Popular Blogs",
        categoryBlogs: "Category: {{category}} Blogs",
        allBlogsTitle: "All Blogs",
        noBlogsFound: "No blogs found",
      },
      blogCategory: {
        construction: "Construction",
        architecture: "Architecture",
        interiorDesign: "Interior Design",
        renovation: "Renovation",
        sustainability: "Sustainability",
        industryNews: "Industry News",
      },
      featuredBlogs: {
        fetchError: "Failed to fetch blogs. Please try again later.",
        latestArticles: "Latest Articles",
        fromOurBlog: "From Our Blog",
        tagline:
          "Stay updated with our latest insights, tutorials, and industry news.",
        readMoreSrText: "Read more about blog post with ID {{blogId}}",
        readMore: "Read more",
        viewAllArticles: "View All Articles",
      },
      coursesList: {
        loadError: "Failed to load courses",
        searchPlaceholder: "Search courses...",
        allCourses: "All Courses",
        activeCourses: "Active Courses",
        freeCourses: "Free Courses",
        paidCourses: "Paid Courses",
        noCoursesFound: "No courses found",
      },

      // Sections
      sections: {
        services: {
          title: "Our Services",
          interiorDesign: {
            title: "Interior Design",
            description:
              "Distinguished interior design that combines aesthetics and functionality, considering the latest trends in decoration.",
          },
          engineeringDesigns: {
            title: "Engineering Designs",
            description:
              "Engineering designs for various projects, including residential, commercial, and industrial.",
          },
          pimModeling: {
            title: "PIM Modeling",
            description: "PIM modeling for engineering projects.",
          },
          landscapeDesigns: {
            title: "Landscape Designs",
            description:
              "Landscape design for various projects, including residential, commercial, and industrial.",
          },
          smartHomes: {
            title: "Smart Homes",
            description: "Smart home solutions and integrated smart systems.",
          },
          aquacultureProjects: {
            title: "Aquaculture Projects",
            description:
              "Design and implementation of modern aquaculture projects.",
          },
          exteriorDesign: {
            title: "Exterior Design",
            description:
              "Innovative architectural facades that reflect your identity and highlight the beauty of the building, while ensuring compatibility with the surrounding environment.",
          },
          gardenDesign: {
            title: "Garden Design",
            description:
              "Transforming outdoor spaces into green oases full of life, with appropriate plant selection for the local climate.",
          },
          smartAutomation: {
            title: "Smart Automation",
            description:
              "Integrated solutions to transform your home into a smart home that can be controlled remotely, with advanced security systems.",
          },
          trainingCourses: {
            title: "Training Courses",
            description:
              "Specialized training programs in interior design and construction, presented by elite experts in the field.",
          },
          costCalculator: {
            title: "Cost Calculator",
            description:
              "Get an initial estimate of your home construction cost based on area and type of finishing you want.",
            calculateButton: "Calculate Cost",
            courseButton: "Training Courses",
            area: "Area in square meters",
            enterAreaPlaceholder: "Enter area in square meters",
            areaRepeated: "Repeated Floors Area (m²)",
            areaPerFloor: "Area per Floor (m²)",
            numFloors: "Number of Floors",
            areaAnnex: "Annex Floor Area (m²)",
            enterAreaRepeatedPlaceholder:
              "Enter total area of repeated floors (m²)",
            enterAreaPerFloorPlaceholder: "Enter area of one floor (m²)",
            enterNumFloorsPlaceholder: "Enter number of repeated floors",
            enterAreaAnnexPlaceholder: "Enter area of annex floor (m²)",
            finishType: {
              title: "Finish Type",
              normal: "Normal Finish",
              luxury: "Luxury Finish",
              premium: "Premium Finish",
            },
            estimatedCostTitle: "Estimated Cost",
            disclaimer:
              "* This cost is an estimate and may vary depending on specifications and location",
            importantNotesTitle: "Important Notes",
            note1: "Cost includes basic materials and labor",
            note2: "Cost does not include land and licenses",
            note3: "Cost can vary by location and specifications",
            note4: "For an accurate quote, please contact us",
            invalidArea: "Please enter a valid area",
            noteEstimationOnly:
              "This price is an estimated cost for construction works only and may increase or decrease by 25% depending on site conditions.",
          },
          moreDetails: "More Details",
        },
        whyChooseUs: {
          title: "Why Choose Ecosus?",
          localExperience: {
            title: "Local Experience",
            description:
              "12 years of experience in the local market, with a deep understanding of Saudi customers' needs.",
          },
          vrTech: {
            title: "VR Technology",
            description:
              "We use virtual reality to enable you to experience the design before implementation, ensuring your complete satisfaction.",
          },
          support: {
            title: "Continuous Technical Support",
            description:
              "A technical support team available 24/7 to assist you with any inquiries or issues you may face.",
          },
          customDesign: {
            title: "Custom Design",
            description:
              "We provide custom design solutions that suit your taste and needs, while maintaining architectural identity.",
          },
          summaryTitle: "Why Choose Ecosus?",
          summaryText:
            "We are a team of experienced professionals who are dedicated to providing the best possible service to our clients. We are committed to using the latest technology and design trends to create beautiful and functional spaces.",
        },
        featuredWork: {
          title: "Featured Work",
          viewDetails: "View Details",
          viewAll: "View All",
          projects: {
            villa: {
              title: "Luxury Villa - Riyadh",
              description:
                "Design and implementation of an 850 m² villa with luxury finishing and integrated smart systems",
            },
            compound: {
              title: "Residential Compound - Jeddah",
              description:
                "Design and implementation of a residential compound consisting of 12 villas with diverse designs and shared gardens",
            },
          },
        },
        smartHomePackages: {
          title: "Smart Home Packages",
          basic: {
            title: "ECONOMY Package",
            features: [
              "2D Furniture Layout Plan",
              "Mood Board",
              "3D Design",
              "Plumbing Fixtures",
              "Printed Copy with CD",
            ],
          },
          advanced: {
            title: "PREMIUM Package",
            features: [
              "2D Furniture Layout Plan",
              "Mood Board",
              "3D Design",
              "Design Working Drawings (Ceilings - Walls)",
              "Plumbing Layout Plan",
              "Materials and Quantities Schedule",
              "Printed Copy with CD",
            ],
            popular: "Most Popular",
          },
          vip: {
            title: "SIGNATURE Package",
            features: [
              "2D Furniture Layout Plan",
              "Mood Board",
              "3D Design with Navigation (360°)",
              "Design Working Drawings (Ceilings - Walls - Floors)",
              "Lighting and Air Conditioning Layout Plan",
              "Electrical Switches and Sanitary Ware Layout Plan",
              "Material and Furniture Schedules and Estimated Estimates",
              "Printed Copy of Project Catalog with CD",
            ],
          },
          basicSuperVision: {
            title: "Basic Super Vision",
            features: [
              "Scheduled field visits (once weekly)",
              "Reviewing implementation work and ensuring its compliance with the design (specifying models only, not including redesign)",
              "Review and manage contractors' accounts with the quantities implemented in nature.",
              "Documenting site observations (photos + periodic reports)",
              "Remote technical and advisory support for the client and contractor team",
              "Partial and final receipt from the contractor of the completed work",
            ],
            notInclude: [
              "Purchasing or supply management",
              "Scheduling timelines",
              "Final furniture or interior design",
            ],
          },
          fullSuperVision: {
            title: "Full Super Vision",
            features: [
              "All features of <<Basic Super Vision>>",
              "Preparing a schedule for implementation phases",
              "Preparing a schedule for the client with advance payments",
              "Managing and supervising the work team and suppliers",
              "Receiving materials and ensuring their compliance with approved technical specifications",
              "Resolving discrepancies between implementation work and approved designs",
              "Reviewing invoices, purchases, and contractor dues",
              "Partial and final delivery of completed work to the client",
            ],
            notInclude: ["Buying furniture or interior design"],
          },
          turnkeyProjectPackage: {
            title: "Turnkey Project Package",
            features: [
              "All the features of <<Basic and Comprehensive Supervision>>",
              "Design/manufacture furniture to suit the client's spaces and required areas",
              "Supply furniture and coordinate with suppliers",
              "Coordination of accessories and final style",
              "Professional photoshoot after final fit-out",
              "Turn-key delivery of completed work",
            ],
          },
          choosePackage: "Choose Package",
        },
        vrDemo: {
          title: "Try Your Smart Home Before Implementation",
          subtitle:
            "We offer you a complete virtual reality experience that enables you to:",
          features: [
            "Experience lighting and curtain control",
            "Preview security and surveillance system",
            "Experience central control interface",
            "Preview custom design",
          ],
          bookNow: "Book Your Experience Now",
          videoNotSupported: "Your browser does not support video playback.",
        },
        callToAction: {
          title: "Free consultation",
          subtitle:
            "Contact us now for a free consultation and assessment of your home needs",
          callUs: "Call Us",
          whatsapp: "WhatsApp",
          getQuote: {
            title: "Get a Free Quote",
            subtitle:
              "Leave your information and our team will contact you within 24 hours",
            name: "Name",
            phone: "Phone Number",
            type: "Type of Consultation",
            send: "Send Request",
            otherTypePlaceholder: "Specify the type of consultation",
          },
        },
        contact: {
          title: "Contact Us",
          contactInfo: {
            title: "Contact Information",
            address: {
              title: "Address",
              details: [
                "Emaar Square, Tower E10, King Abdullah Road, Al Fayhaa, Jeddah 22241, Saudi Arabia",
              ],
            },
            phone: {
              title: "Call Us",
              details: ["+966 558 813 386"],
            },
            email: {
              title: "Email",
              details: ["info@ecosus.com.sa"],
            },
            hours: {
              title: "Working Hours",
              details: ["Saturday - Thursday: 9 AM - 5 PM", "Friday: Closed"],
            },
          },
          location: {
            title: "Location",
          },
        },
        about: {
          title: "Ecosus, the beauty icon",
          subtitle: "With you from the idea until you receive the key",
          description: "Learn about the most popular and widely used models.",
          bottomText: "Innovative Designs for a Beautiful World",
          projects: [
            {
              id: 1,
              title: "Classic Style",
              description:
                "The classic style is characterized by luxury and sophistication, relying on fine details and traditional decorations to add a sense of authenticity and luxury to spaces.",
              image: classic,
              category: "classic",
            },
            {
              id: 2,
              title: "Modern Style",
              description:
                "Modern style focuses on simplicity and practicality, with clean lines and neutral colors, and relies on the use of modern materials and advanced design techniques.",
              image: modern,
              category: "modern",
            },
            {
              id: 3,
              title: "Trendy Style",
              description:
                "The trending style combines the latest design trends and innovation, reflecting contemporary taste by blending bold colors and diverse materials.",
              image: trendy,
              category: "trendy",
            },
          ],
        },
        testimonials: {
          title: "Testimonials",
          subtitle: "What Our Clients Say",
          description:
            "Hear from our community of clients about their experiences and success stories.",
          readFullStory: "Read Full Story",
          shareYourStory: "Share Your Story",
          loading: "Loading testimonials...",
          error: "Failed to fetch testimonials. Please try again later.",
          noTestimonials: "No testimonials available yet.",
          dateFormat: "{{date}}",
          anonymous: "Anonymous",
          searchPlaceholder: "Search by name or content...",
          filterByRating: "Filter by Rating",
          allRatings: "All Ratings",
          clearFilters: "Clear Filters",
          noResultsFound: "No testimonials match your search criteria.",
          showingResults: "Showing {{count}} of {{total}} testimonials",
        },
        profile: {
          defaultUser: "User",
          userAvatar: "User Avatar",
          joined: "Joined",
          welcomeMessage:
            "Welcome to your profile dashboard. Manage your information and access your consultations.",
          errorTitle: "Profile Error",
          returnToLogin: "Return to Login",
          lastLogin: "Last Login",
          contactInfo: {
            title: "Contact Information",
            email: "Email Address",
            phone: "Phone Number",
          },
          accountOverview: {
            title: "Account Overview",
            level: "Level",
          },
          quickActions: {
            title: "Quick Actions",
            myConsultations: "My Consultations",
            updateProfile: "Update Profile",
            changePassword: "Change Password",
          },
          blockHistory: {
            title: "Block History",
            blockedAt: "Blocked At",
            blockedBy: "Blocked By",
            reason: "Reason",
            expiresAt: "Expires At",
            unblockedAt: "Unblocked At",
            noHistory: "No block history found.",
          },
        },
      },
      userLevels: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
    },
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      packages: "الباقات",
      courses: "الدورات",
      blog: "المدونة",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",

      // Admin
      dashboard: "لوحة التحكم",
      projects: "المشاريع",
      consultations: "الاستشارات",
      manageProjects: "إدارة المشاريع",
      manageBlog: "إدارة المدونة",
      manageConsultations: "إدارة الاستشارات",

      // Common
      readMore: "اقرأ المزيد",
      learnMore: "اعرف المزيد",
      viewAll: "عرض الكل",
      submit: "إرسال",
      cancel: "إلغاء",
      save: "حفظ",
      delete: "حذف",
      edit: "تعديل",
      create: "إنشاء",
      update: "تحديث",
      search: "بحث",
      loading: "جاري التحميل...",
      error: "خطأ",
      success: "نجاح",
      warning: "تحذير",
      info: "معلومات",
      backToHome: "العودة إلى الرئيسية",

      // Page Titles
      pageTitle: {
        blogs: "المدونات",
        courses: "الدورات",
        costCalculator: "حاسبة التكلفة",
      },

      // Blogs List Page
      blogsListPage: {
        categoryTitle: "مدونات {{category}}",
        latestBlogsTitle: "أحدث المدونات",
        categoryDescription:
          "استكشف مجموعتنا من المقالات والرؤى المتعلقة بـ {{category}}.",
        latestBlogsDescription:
          "اكتشف أحدث مقالاتنا، رؤىنا، وآخر التحديثات من صناعة البناء.",
      },

      // Forms
      name: "الاسم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      phone: "الهاتف",
      message: "الرسالة",
      subject: "الموضوع",
      description: "الوصف",
      title: "العنوان",
      category: "الفئة",
      location: "الموقع",
      budget: "الميزانية",
      status: "الحالة",
      date: "التاريخ",

      // Validation
      required: "{{field}} مطلوب",
      invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
      passwordLength: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
      passwordMatch: "كلمات المرور غير متطابقة",
      invalidPhone: "يرجى إدخال رقم هاتف صحيح",

      // Messages
      loginSuccess: "تم تسجيل الدخول بنجاح",
      logoutSuccess: "تم تسجيل الخروج بنجاح",
      registerSuccess: "تم التسجيل بنجاح",
      updateSuccess: "تم التحديث بنجاح",
      deleteSuccess: "تم الحذف بنجاح",
      createSuccess: "تم الإنشاء بنجاح",
      errorOccurred: "حدث خطأ",
      tryAgain: "يرجى المحاولة مرة أخرى",
      noData: "لا توجد بيانات",
      noResults: "لا توجد نتائج",

      // Login Page
      loginPage: {
        welcomeBack: "مرحباً بعودتك",
        createAccount: "إنشاء حساب جديد",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        passwordLabel: "كلمة المرور",
        passwordPlaceholder: "أدخل كلمة المرور",
        rememberMe: "تذكرني",
        forgotPassword: "نسيت كلمة المرور؟",
        signIn: "تسجيل الدخول",
        signingIn: "جاري تسجيل الدخول...",
        enterBothFields: "الرجاء إدخال البريد الإلكتروني وكلمة المرور",
        invalidCredentials: "بريد إلكتروني أو كلمة مرور غير صحيحة",
        accountBlocked:
          "تم حظر حسابك.\n\nسبب الحظر:\n{{reason}}\n\n{{expiresAt}}",
        noReasonProvided: "لم يتم تقديم سبب",
        permanentBlock: "هذا حظر دائم",
        blockExpiresAt: "مدة الحظر: {{date}}",
      },

      // Register Page
      registerPage: {
        createAccount: "إنشاء حساب جديد",
        signInToAccount: "تسجيل الدخول إلى حسابك",
        fullNameLabel: "الاسم الكامل",
        fullNamePlaceholder: "أدخل اسمك الكامل",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        phoneLabel: "رقم الهاتف",
        phonePlaceholder: "أدخل رقم هاتفك",
        passwordLabel: "كلمة المرور",
        passwordPlaceholder: "إنشاء كلمة مرور",
        confirmPasswordLabel: "تأكيد كلمة المرور",
        confirmPasswordPlaceholder: "تأكيد كلمة المرور",
        termsAgreement: "بإنشاء حساب، فإنك توافق على",
        termsOfService: "شروط الخدمة",
        and: "و",
        privacyPolicy: "سياسة الخصوصية",
        createAccountButton: "إنشاء حساب",
        creatingAccount: "جاري إنشاء الحساب...",
        // Validation messages
        passwordLength: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
        passwordsDoNotMatch: "كلمات المرور غير متطابقة",
        nameRequired: "الاسم مطلوب",
        emailRequired: "البريد الإلكتروني مطلوب",
        phoneRequired: "رقم الهاتف مطلوب",
        invalidEmail: "الرجاء إدخال بريد إلكتروني صحيح",
        registrationFailed: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
        registrationSuccess:
          "تم التسجيل بنجاح! يرجى التحقق من بريدك الإلكتروني للتحقق من حسابك.",
      },

      // Update Details Page
      updateDetailsPage: {
        title: "تحديث بياناتك",
        subtitle: "تحديث معلوماتك الشخصية",
        fullNameLabel: "الاسم الكامل",
        fullNamePlaceholder: "أدخل اسمك الكامل",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        phoneLabel: "رقم الهاتف",
        phonePlaceholder: "أدخل رقم هاتفك",
        profilePictureLabel: "الصورة الشخصية",
        profilePreviewAlt: "معاينة الصورة الشخصية",
        fileInputLabel: "اختر ملفاً",
        selectedFile: "تم اختيار: {{fileName}}",
        previewReady: "معاينة جاهزة - قم بالتحديث للحفظ",
        cancelButton: "إلغاء",
        updateButton: "تحديث الملف الشخصي",
        updatingButton: "جاري تحديث الملف الشخصي...",
        // Messages
        loadError: "فشل تحميل بيانات المستخدم",
        updateSuccess: "تم تحديث البيانات بنجاح!",
        updateError: "فشل تحديث البيانات",
        unauthorized: "غير مصرح",
      },

      // Arabic translations
      common: {
        visitor: "زائر",
        tryAgain: "حاول مرة أخرى",
        notProvided: "غير متوفر",
        admin: "مسؤول",
        active: "نشط",
        unknown: "غير معروف",
        delete: "حذف",
        cancel: "الغاء",
        loading: "جاري التحميل...",
        submit: "إرسال",
        success: "نجاح",
        error: "خطأ",
        reason: "السبب",
        notApplicable: "لا ينطبق",
      },
      blogDetail: {
        loadError: "فشل تحميل المدونة",
        feedbackError: "فشل إرسال التعليق",
        notFound: "المدونة غير موجودة",
        backToBlogs: "العودة إلى المدونات",
        unknownAuthor: "مؤلف غير معروف",
        category: "الفئة",
        feedbackAndRatings: "التعليقات والتقييمات",
        ratingOutOfFive: "{{rating}} من 5",
        reviews: "({{count}} مراجعة)",
        writeAReview: "اكتب مراجعة",
        noFeedback: "لا توجد تعليقات حتى الآن. كن أول من يراجع!",
        noTestimonials: "لا توجد آراء متاحة حتى الآن.",
        dateFormat: "{{date}}",
      },
      courseDetail: {
        loadError: "فشل تحميل تفاصيل الدورة",
        enrollError: "فشل تحديث حالة التسجيل",
        feedbackError: "فشل إرسال التعليق",
        notFound: "الدورة غير موجودة",
        backToCourses: "العودة إلى الدورات",
        description: "الوصف",
        whatYoullLearn: "ماذا ستتعلم",
        requirements: "المتطلبات",
        minutes: "{{count}} دقيقة",
        videoLink: "رابط الفيديو",
        noCurriculum: "لا يوجد منهج متاح بعد.",
        unknownInstructor: "مدرب غير معروف",
        ratingOutOfFive: "{{rating}} من 5",
        reviews: "({{count}} مراجعة)",
        writeAReview: "اكتب مراجعة",
        noFeedback: "لا توجد تعليقات حتى الآن. كن أول من يراجع!",
        noImage: "لا توجد صورة",
        hoursOfContent: "{{count}} ساعة من المحتوى",
        studentsEnrolled: "{{count}} طالب مسجل",
        status: "نشط",
        tab: {
          overview: "نظرة عامة",
          curriculum: "المنهج الدراسي",
          instructor: "المدرب",
          feedback: "التعليقات",
        },
        free: "مجاني",
        unenrollButton: "إلغاء التسجيل من الدورة",
        notAvailableButton: "الدورة غير متاحة",
        loginToEnrollButton: "تسجيل الدخول للتسجيل",
        enrollNowButton: "سجل الآن",
        modulesCount: "{{count}} وحدة",
      },
      blogsList: {
        loadError: "فشل تحميل المدونات",
        allBlogs: "جميع المدونات",
        popularBlogs: "المدونات الشائعة",
        categoryBlogs: "الفئة: {{category}} مدونات",
        allBlogsTitle: "جميع المدونات",
        noBlogsFound: "لم يتم العثور على مدونات",
      },
      blogCategory: {
        construction: "البناء",
        architecture: "الهندسة المعمارية",
        interiorDesign: "التصميم الداخلي",
        renovation: "التجديد",
        sustainability: "الاستدامة",
        industryNews: "أخبار الصناعة",
      },
      featuredBlogs: {
        fetchError: "فشل في جلب المدونات. يرجى المحاولة مرة أخرى لاحقًا.",
        latestArticles: "أحدث المقالات",
        fromOurBlog: "من مدونتنا",
        tagline: "ابق على اطلاع بآخر رؤىنا، برامجنا التعليمية، وأخبار الصناعة.",
        readMoreSrText: "اقرأ المزيد عن منشور المدونة بالمعرف {{blogId}}",
        readMore: "اقرأ المزيد",
        viewAllArticles: "عرض جميع المقالات",
      },
      coursesList: {
        loadError: "فشل تحميل الدورات",
        searchPlaceholder: "البحث عن دورات...",
        allCourses: "جميع الدورات",
        activeCourses: "الدورات النشطة",
        freeCourses: "الدورات المجانية",
        paidCourses: "الدورات المدفوعة",
        noCoursesFound: "لم يتم العثور على دورات",
      },

      // Sections
      sections: {
        services: {
          title: "خدماتنا",
          interiorDesign: {
            title: "التصميم الداخلي",
            description:
              "تصميم داخلي متميز يجمع بين الجماليات والوظيفية، مع مراعاة أحدث الاتجاهات في عالم الديكور.",
          },
          engineeringDesigns: {
            title: "تصميمات هندسية",
            description:
              "تصميمات هندسية للمشاريع المختلفة، بما في ذلك المنازل والمباني التجارية والصناعية.",
          },
          pimModeling: {
            title: "نمذجة معلومات المشاريع (PIM)",
            description: "نمذجة معلومات المشاريع (PIM) للمشاريع الهندسية.",
          },
          landscapeDesigns: {
            title: "تصميمات لاندسكيب",
            description: "تصميم الحدائق والمساحات الخارجية.",
          },
          smartHomes: {
            title: "المنازل الذكية",
            description: "حلول المنازل الذكية والأنظمة الذكية المتكاملة.",
          },
          aquacultureProjects: {
            title: "تصميم مشاريع الاستزراع المائي",
            description: "تصميم وتنفيذ مشاريع الاستزراع المائي الحديثة.",
          },
          exteriorDesign: {
            title: "التصميم الخارجي",
            description:
              "تصميم واجهات معمارية مبتكرة تعكس هويتك وتبرز جمال المبنى، مع ضمان التوافق مع البيئة المحيطة.",
          },
          gardenDesign: {
            title: "تصميم الحدائق",
            description:
              "تحويل المساحات الخارجية إلى واحات خضراء تنبض بالحياة، مع اختيار النباتات المناسبة للمناخ المحلي.",
          },
          smartAutomation: {
            title: "الأتمتة الذكية",
            description:
              "حلول متكاملة لتحويل منزلك إلى منزل ذكي يمكن التحكم فيه عن بعد، مع أنظمة أمان متطورة.",
          },
          trainingCourses: {
            title: "دورات تدريبية",
            description:
              "برامج تدريبية متخصصة في التصميم الداخلي والبناء، تقدمها نخبة من الخبراء في المجال.",
          },
          costCalculator: {
            title: "حاسبة تكلفة البناء",
            description:
              "احصل على تقدير أولي لتكلفة بناء منزلك بناءً على المساحة ونوع التشطيب الذي تريده.",
            calculateButton: "احسب التكلفة",
            courseButton: "الدورات التدريبية",
            area: "المساحة بالمتر المربع",
            enterAreaPlaceholder: "أدخل المساحة بالمتر المربع",
            areaRepeated: "مساحة الأدوار المتكررة (م²)",
            areaPerFloor: "مساحة الدور الواحد (م²)",
            numFloors: "عدد الأدوار المتكررة",
            areaAnnex: "مساحة دور الملحق (م²)",
            enterAreaRepeatedPlaceholder:
              "أدخل إجمالي مساحة الأدوار المتكررة (م²)",
            enterAreaPerFloorPlaceholder: "أدخل مساحة الدور الواحد (م²)",
            enterNumFloorsPlaceholder: "أدخل عدد الأدوار المتكررة",
            enterAreaAnnexPlaceholder: "أدخل مساحة دور الملحق (م²)",
            finishType: {
              title: "نوع التشطيب",
              normal: "تشطيب عادي",
              luxury: "تشطيب فاخر",
              premium: "تشطيب لوكس",
            },
            estimatedCostTitle: "التكلفة التقديرية",
            disclaimer: "* هذه التكلفة تقديرية وقد تختلف حسب المواصفات والموقع",
            importantNotesTitle: "ملاحظات هامة",
            note1: "التكلفة تشمل المواد الأساسية والعمالة",
            note2: "لا تشمل التكلفة الأرض والتراخيص",
            note3: "يمكن أن تختلف التكلفة حسب الموقع والمواصفات",
            note4: "للحصول على عرض سعر دقيق، يرجى التواصل معنا",
            noteEstimationOnly:
              "هذا السعر تكلفة تقديرية للأعمال الإنشائية فقط وقد يزيد أو يقل بنسبة 25% حسب ظروف الموقع.",
          },
          moreDetails: "المزيد من التفاصيل",
        },
        whyChooseUs: {
          title: "لماذا تختار Ecosus ؟",
          localExperience: {
            title: "خبرة محلية",
            description:
              "فريقنا يتمتع بخبرة واسعة وفهم عميق للسوق المحلي واحتياجات العملاء السعوديين، مما يضمن تقديم حلول مبتكرة وملائمة لكل مشروع.",
          },
          vrTech: {
            title: "تقنيات VR",
            description:
              "نستخدم الواقع الافتراضي لتمكينك من تجربة التصميم قبل التنفيذ، مما يضمن رضاك التام.",
          },
          support: {
            title: "دعم فني مستمر",
            description:
              "فريق دعم فني متاح على مدار الساعة لمساعدتك في أي استفسار أو مشكلة قد تواجهك.",
          },
          customDesign: {
            title: "تصميم مخصص",
            description:
              "نقدم حلولاً تصميمية مخصصة تناسب ذوقك واحتياجاتك، مع الحفاظ على الهوية المعمارية.",
          },
          summaryTitle: "لماذا تختار Ecosus ؟ ",
          summaryText:
            "نحن فريق من الخبراء المؤهلين الذين يتمتعون بخبرة واسعة وفهم عميق للسوق المحلي واحتياجات العملاء السعوديين، مما يضمن تقديم حلول مبتكرة وملائمة لكل مشروع.",
        },
        featuredWork: {
          title: "أعمال مختارة",
          viewDetails: "عرض التفاصيل",
          viewAll: "عرض الكل",
          projects: {
            villa: {
              title: "فيلا فاخرة - الرياض",
              description:
                "تصميم وتنفيذ فيلا مساحة 850 م² بتشطيب لوكس وأنظمة ذكية متكاملة",
            },
            compound: {
              title: "مجمع سكني - جدة",
              description:
                "تصميم وتنفيذ مجمع سكني مكون من 12 فيلا بتصاميم متنوعة وحدائق مشتركة",
            },
          },
        },
        smartHomePackages: {
          title: "باقات المنازل الذكية",
          basic: {
            title: "الباقة Economy",
            features: [
              "مخطط توزيع أثاث 2D",
              "Mood Board",
              "تصميم ثلاثي الأبعاد 3D",
              "مخطط توزيع الأدوات الصحية",
              "نسخة مطبوعة للمشروع مع CD",
            ],
          },
          advanced: {
            title: "الباقة Premium",
            features: [
              "مخطط توزيع أثاث 2D",
              "Mood Board",
              "تصميم ثلاثي الأبعاد 3D",
              "رسومات تنفيذية للتصميم (أسقف - حوائط)",
              "مخطط توزيع الأدوات الصحية",
              "جدول الخامات والكميات",
              "نسخة مطبوعة للمشروع مع CD",
            ],
            popular: "الأكثر طلبًا",
          },
          vip: {
            title: "الباقة Signature",
            features: [
              "مخطط توزيع أثاث 2D",
              "Mood Board",
              "تصميم ثلاثي الأبعاد 3D قابل للتجول (360°)",
              "رسومات تنفيذية للتصميم (أسقف - حوائط - أرضيات)",
              "مخطط توزيع إنارة وتوزيع تكييف",
              "مخطط توزيع مفاتيح الكهرباء والأدوات الصحية",
              "جداول الخامات وأثاث ومقايسة تقديرية",
              "نسخة مطبوعة لكتالوج المشروع مع CD",
            ],
          },
          basicSuperVision: {
            title: "باقة الأشراف الأساسي",
            features: [
              "زيارات ميدانية مجدوله (مرة أسبوعيا)",
              "مراجعة أعمال التنفيذ والتأكد من مطابقتها للتصميم (تحديد التعارضات فقط ولا يشمهل اعادة التصميم)",
              "مراجعة وادارة حسابات المقاولين مع الكميات المنفذة بالطبيعة",
              "توثيق ملاحظات الموقع (صور + تقارير دورية)",
              "دعم فني واستشاري للعميل وفريق المقاول عن بعد",
              "استلام جزئي ونهائي من المقاول بالأعمال المنجزة",
            ],
            notInclude: [
              "إدارة المشتريات او التوريد",
              "تنسيق الجداول الزمنية",
              "تأثيث أو تجهيزات نهائية",
            ],
          },
          fullSuperVision: {
            title: "باقة الأشراف الشامل",
            features: [
              "كل مميزات <<الإشراف الأساسي>>",
              "إعداد جدول زمني للمراحل التنفيذية",
              "اعـــداد جــــدول زمنـــي للعميـــــل بالدفـــعات الماليـــــة المقدمـــة",
              "الإدارة والإشـــــراف عـــلى فريــــــق العمل والموردين",
              "استلام المـــواد والتأكــــد مــن مطابقتها للمواصفات الفنيــة المعتمدة",
              "معالجة التعارضات بين أعمال التنفيذ والتصاميم المعتمدة",
              "مراجعة الفواتير والمشتريات ومستحقات المقاولين",
              "تسليم جزئي ونهائي للعميل بالأعمال المنجزة",
            ],
            notInclude: ["شراء الأثاث أو التنسيق الداخلي"],
          },
          turnkeyProjectPackage: {
            title: "باقة تسليم المفتاح",
            features: [
              "كل مميزات <<الإشراف الأساسي والشامل>>",
              "تصميم/تصنيع الأثاث بما يتناسب مع فراغات العميل والمساحات المطلوبة",
              "توريد الأثاث والتنسيق مع الموردين",
              "تنسيق الإكسسوارات والستايل النهائي",
              "جلسة تصوير احترافية بعد التجهيز النهائي",
              "تسليم مفتاح للأعمال المنفذة",
            ],
          },
          currency: "ريال",
          choosePackage: "اختر الباقة",
        },
        vrDemo: {
          title: "جرب منزلك الذكي قبل التنفيذ",
          subtitle: "نقدم لك تجربة واقع افتراضي متكاملة تمكنك من:",
          features: [
            "تجربة التحكم في الإضاءة والستائر",
            "معاينة نظام الأمان والمراقبة",
            "تجربة واجهة التحكم المركزية",
            "معاينة التصميم المخصص",
          ],
          bookNow: "احجز تجربتك الآن",
          videoNotSupported: "متصفحك لا يدعم تشغيل الفيديو.",
        },
        callToAction: {
          title: "أستشاره مجانية",
          subtitle:
            "تواصل معنا الآن للحصول على استشارة مجانية وتقييم احتياجات منزلك",
          callUs: "اتصل بنا",
          whatsapp: "واتساب",
          getQuote: {
            title: "احصل على عرض سعر مجاني",
            subtitle: "اترك معلوماتك وسيتواصل معك فريقنا خلال 24 ساعة",
            name: "الاسم",
            phone: "رقم الجوال",
            type: "نوع الأستشارة",
            send: "إرسال الطلب",
            otherTypePlaceholder: "حدد نوع الاستشارة",
          },
        },
        contact: {
          title: "تواصل معنا",
          contactInfo: {
            title: "معلومات الاتصال",
            address: {
              title: "العنوان",
              details: [
                "اعمار سكوير، برج E10، طريق الملك عبدالله، الفيحاء، جدة 22241، المملكة العربية السعودية",
              ],
            },
            phone: {
              title: "اتصل بنا",
              details: ["+966 558 813 386"],
            },
            email: {
              title: "البريد الإلكتروني",
              details: ["info@ecosus.com.sa"],
            },
            hours: {
              title: "ساعات العمل",
              details: ["السبت - الخميس: 9 صباحاً - 5 مساءً", "الجمعة: مغلق"],
            },
          },
          location: {
            title: "الموقع",
          },
        },
        about: {
          title: "Ecosus أيقونة الجمال",
          subtitle: "معك من الفكرة حتى تستلم المفتاح",
          description: "تعرف على الطُرز الاشهر والاكثر استخداماً",
          bottomText: "تصاميم مبتكرة لعالم أجمل",
          projects: [
            {
              id: 1,
              title: "الطراز الكلاسيك",
              description:
                "يتميز الطراز الكلاسيك بالفخامة والرقي، ويعتمد على التفاصيل الدقيقة والزخارف التقليدية ليضفي إحساساً بالأصالة والترف على المساحات.",
              image: classic,
              category: "classic",
              pdf: "/pdf/كتالوج كلاسيك.pdf",
            },
            {
              id: 2,
              title: "الطراز الحديث",
              description:
                "يركز الطراز الحديث على البساطة والعملية، مع خطوط واضحة وألوان محايدة، ويعتمد على استخدام المواد الحديثة والتقنيات المتطورة في التصميم.",
              image: modern,
              category: "modern",
              pdf: "/pdf/كتالوج مودرن.pdf",
            },
            {
              id: 3,
              title: "الطراز التريند",
              description:
                "يجمع الطراز التريند بين أحدث صيحات التصميم والابتكار، ويعكس الذوق العصري من خلال المزج بين الألوان الجريئة والخامات المتنوعة.",
              image: trendy,
              category: "trendy",
              pdf: "/pdf/كتالوج رائجة.pdf",
            },
          ],
        },
        testimonials: {
          title: "آراء العملاء",
          subtitle: "ماذا يقول عملائنا",
          description: "استمع إلى تجارب وقصص نجاح مجتمعنا من العملاء.",
          readFullStory: "اقرأ القصة كاملة",
          shareYourStory: "شارك قصتك",
          loading: "جاري تحميل الآراء...",
          error: "فشل في تحميل الآراء. يرجى المحاولة مرة أخرى لاحقاً.",
          noTestimonials: "لا توجد آراء متاحة حتى الآن.",
          dateFormat: "{{date}}",
          anonymous: "مجهول",
          searchPlaceholder: "بحث بالاسم أو المحتوى...",
          filterByRating: "تصفية بالتقييم",
          allRatings: "جميع التقييمات",
          clearFilters: "إزالة التصفية",
          noResultsFound: "لا توجد آراء تطابق مع معايير البحث.",
          showingResults: "إظهار {{count}} من {{total}} آراء",
        },
        profile: {
          defaultUser: "مستخدم",
          userAvatar: "صورة المستخدم الرمزية",
          joined: "انضم في",
          welcomeMessage: "إدارة تفاصيل ملفك الشخصي وتفضيلاتك هنا.",
          errorTitle: "عذراً! حدث خطأ ما.",
          returnToLogin: "العودة لتسجيل الدخول",
          lastLogin: "آخر تسجيل دخول",
          contactInfo: {
            title: "معلومات الاتصال",
            email: "البريد الإلكتروني",
            phone: "رقم الهاتف",
          },
          accountOverview: {
            title: "نظرة عامة على الحساب",
            level: "المستوى",
          },
          quickActions: {
            title: "إجراءات سريعة",
            myConsultations: "استشاراتي",
            updateProfile: "تحديث الملف الشخصي",
            changePassword: "تغيير كلمة المرور",
          },
          blockHistory: {
            title: "سجل الحظر",
            blockedAt: "تاريخ الحظر",
            blockedBy: "حظر بواسطة",
            reason: "السبب",
            expiresAt: "تاريخ الانتهاء",
            unblockedAt: "تاريخ إلغاء الحظر",
            noHistory: "لا يوجد سجل حظر.",
          },
        },
      },
      userLevels: {
        beginner: "مبتدئ",
        intermediate: "متوسط",
        advanced: "متقدم",
      },
    },
  },
};
