import { FEATURE2_IMAGE } from "../../constants/images";

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
            title: "Building Cost Calculator",
            description:
              "Get an initial estimate of your home construction cost based on area and type of finishing you want.",
            calculateButton: "Calculate Cost",
            area: "Area in square meters",
            enterAreaPlaceholder: "Enter area in square meters",
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
          },
          moreDetails: "More Details",
        },
        whyChooseUs: {
          title: "Why Choose Modern Construction Company?",
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
        },
        featuredWork: {
          title: "Featured Work",
          viewDetails: "View Details",
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
            title: "Basic Package",
            features: [
              "Smart lighting system",
              "Curtain control",
              "One surveillance camera",
              "Technical support for 6 months",
            ],
          },
          advanced: {
            title: "Advanced Package",
            features: [
              "Smart lighting and curtain system",
              "4 surveillance cameras",
              "Integrated audio system",
              "AC control",
              "Technical support for 1 year",
            ],
            popular: "Most Popular",
          },
          vip: {
            title: "VIP Package",
            features: [
              "All Advanced Package features",
              "Integrated security system",
              "Control of all devices",
              "Central control screen",
              "Technical support for 2 years",
              "Custom control interface design",
            ],
          },
          currency: "SAR",
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
          title: "Ready to Transform Your Home into a Smart Home?",
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
            message: "Your Message",
            send: "Send Request",
          },
        },
        contact: {
          title: "Contact Us",
          contactInfo: {
            title: "Contact Information",
            address: {
              title: "Address",
              details: ["Riyadh, Al-Nakheel District", "P.O. Box 12345"],
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
              details: ["Saturday - Thursday: 9 AM - 6 PM", "Friday: Closed"],
            },
          },
          location: {
            title: "Location",
          },
        },
        about: {
          title: "Shd, the beauty icon",
          subtitle: "With you from the idea until you receive the key",
          description: "Learn about the most popular and widely used models.",
          bottomText: "Innovative Designs for a Beautiful World",
          projects: [
            {
              id: 1,
              title: "Modern Style",
              description:
                "The credit for creating this style goes to a wide range of influences...",
              image: FEATURE2_IMAGE,
              category: "modern",
            },
            {
              id: 2,
              title: "Neo Classic Style in Interior Design",
              description:
                "Neo Classic style took its roots from 18th-century archaeological discoveries...",
              image: FEATURE2_IMAGE,
              category: "neo-classic",
            },
            {
              id: 3,
              title: "Why Saab: Beauty in Imperfection",
              description:
                "Why Saab | Nature fascinates us with its simplicity and beauty...",
              image: FEATURE2_IMAGE,
              category: "concept",
            },
            {
              id: 4,
              title: "Types of Styles in Interior Design",
              description:
                "Interior design is an art and taste that suits the owner's personality...",
              image: FEATURE2_IMAGE,
              category: "design",
            },
            {
              id: 5,
              title: "Classic Style",
              description:
                "Classic style is sophisticated and refined with a special character...",
              image: FEATURE2_IMAGE,
              category: "classic",
            },
            {
              id: 6,
              title: "Industrial Style",
              description:
                "This style began in the fifties and relies on raw materials...",
              image: FEATURE2_IMAGE,
              category: "industrial",
            },
          ],
        },
        testimonials: {
          title: "Testimonials",
          subtitle: "What Our Students Say",
          description:
            "Hear from our community of learners about their experiences and success stories.",
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
            area: "المساحة بالمتر المربع",
            enterAreaPlaceholder: "أدخل المساحة بالمتر المربع",
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
            invalidArea: "الرجاء إدخال مساحة صحيحة",
          },
          moreDetails: "المزيد من التفاصيل",
        },
        whyChooseUs: {
          title: "لماذا تختار شركة البناء الحديث؟",
          localExperience: {
            title: "خبرة محلية",
            description:
              "12 عامًا من الخبرة في السوق المحلي، مع فهم عميق لاحتياجات العملاء السعوديين.",
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
        },
        featuredWork: {
          title: "أعمال مختارة",
          viewDetails: "عرض التفاصيل",
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
            title: "الباقة الأساسية",
            features: [
              "نظام إضاءة ذكي",
              "تحكم في الستائر",
              "كاميرا مراقبة واحدة",
              "دعم فني لمدة 6 أشهر",
            ],
          },
          advanced: {
            title: "الباقة المتقدمة",
            features: [
              "نظام إضاءة وستائر ذكي",
              "4 كاميرات مراقبة",
              "نظام صوتي متكامل",
              "تحكم في التكييف",
              "دعم فني لمدة سنة",
            ],
            popular: "الأكثر طلبًا",
          },
          vip: {
            title: "الباقة VIP",
            features: [
              "جميع مميزات الباقة المتقدمة",
              "نظام أمان متكامل",
              "تحكم في جميع الأجهزة",
              "شاشة تحكم مركزية",
              "دعم فني لمدة سنتين",
              "تصميم مخصص لواجهة التحكم",
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
          title: "جاهزون لتحويل منزلك إلى منزل ذكي؟",
          subtitle:
            "تواصل معنا الآن للحصول على استشارة مجانية وتقييم احتياجات منزلك",
          callUs: "اتصل بنا",
          whatsapp: "واتساب",
          getQuote: {
            title: "احصل على عرض سعر مجاني",
            subtitle: "اترك معلوماتك وسيتواصل معك فريقنا خلال 24 ساعة",
            name: "الاسم",
            phone: "رقم الجوال",
            message: "رسالتك",
            send: "إرسال الطلب",
          },
        },
        contact: {
          title: "تواصل معنا",
          contactInfo: {
            title: "معلومات الاتصال",
            address: {
              title: "العنوان",
              details: ["الرياض، حي النخيل", "ص.ب 12345"],
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
              details: ["السبت - الخميس: 9 صباحاً - 6 مساءً", "الجمعة: مغلق"],
            },
          },
          location: {
            title: "الموقع",
          },
        },
        about: {
          title: "شاد أيقونة الجمال",
          subtitle: "معك من الفكرة حتى تستلم المفتاح",
          description: "تعرف على الطُرز الاشهر والاكثر استخداماً",
          bottomText: "تصاميم مبتكرة لعالم أجمل",
          projects: [
            {
              id: 1,
              title: "الطراز الحديث",
              description:
                "يعود الفضل في إنشاء هذا الطراز إلى مجموعة واسعة من المؤثرات...",
              image: FEATURE2_IMAGE,
              category: "modern",
            },
            {
              id: 2,
              title: "طراز نيو كلاسيك في التصميم الداخلي",
              description:
                "أخذ طراز نيو كلاسيك جذوره من الاكتشافات الأثرية في القرن الثامن عشر...",
              image: FEATURE2_IMAGE,
              category: "neo-classic",
            },
            {
              id: 3,
              title: "واي ساب: الجمال في عدم الكمال",
              description: "واي ساب | تسحرنا الطبيعة ببساطتها وجمالها...",
              image: FEATURE2_IMAGE,
              category: "concept",
            },
            {
              id: 4,
              title: "أنواع الطراز في التصميم الداخلي",
              description:
                "يعتبر التصميم الداخلي فن وذوق يتناسب مع شخصية المالك...",
              image: FEATURE2_IMAGE,
              category: "design",
            },
            {
              id: 5,
              title: "الطراز الكلاسيكي",
              description: "الطراز الكلاسيكي أسلوب راقٍ ومتطور وله طابع خاص...",
              image: FEATURE2_IMAGE,
              category: "classic",
            },
            {
              id: 6,
              title: "الطراز الصناعي",
              description:
                "بدأ استخدام هذا النمط في الخمسينات، ويعتمد على المواد الخام...",
              image: FEATURE2_IMAGE,
              category: "industrial",
            },
          ],
        },
        testimonials: {
          title: "آراء العملاء",
          subtitle: "ماذا يقول طلابنا",
          description: "استمع إلى تجارب وقصص نجاح مجتمعنا من المتعلمين.",
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
