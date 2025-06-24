const Course = require("../models/Course");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Search courses
// @route   GET /api/courses/search
// @access  Public
exports.searchCourses = asyncHandler(async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    return next(new ErrorResponse("Please provide a search query", 400));
  }

  // Create a regex pattern that matches partial words
  const searchRegex = new RegExp(q.split("").join(".*"), "i");

  const courses = await Course.find({
    $or: [
      { title: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
      { shortDescription: { $regex: searchRegex } },
      { requirements: { $regex: searchRegex } },
      { objectives: { $regex: searchRegex } },
    ],
  })
    .populate("instructor", "name email avatar")
    .populate("category", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = asyncHandler(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query object
    const query = {};

    // Add category filter if provided
    if (req.query.category) {
      query.category = req.query.category;
    }

    const courses = await Course.find(query)
      .populate("instructor", "name email avatar")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments(query);

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: courses,
    });
  } catch (error) {
    console.error("Get all courses error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)
    .populate("instructor", "name email avatar")
    .populate("category", "name");

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = asyncHandler(async (req, res, next) => {
  try {
    // Add instructor to req.body
    req.body.instructor = req.user.id;

    // Helper to parse JSON string fields
    const parseJsonField = (field) => {
      if (typeof req.body[field] === "string") {
        try {
          return JSON.parse(req.body[field]);
        } catch (e) {
          console.error(`Error parsing ${field}:`, e);
          return [];
        }
      }
      return req.body[field] || [];
    };

    // Parse arrays
    req.body.requirements = parseJsonField("requirements");
    req.body.objectives = parseJsonField("objectives");
    req.body.modules = parseJsonField("modules");

    // Handle video if uploaded
    if (req.file) {
      req.body.video = req.file.filename;
    } else if (req.body.video === "null") {
      // If video is explicitly sent as "null" (e.g., on edit when removing video)
      req.body.video = null;
    }

    // Convert string booleans to actual booleans
    if (req.body.isActive === "true") req.body.isActive = true;
    if (req.body.isActive === "false") req.body.isActive = false;
    // Add isPublished conversion as well, if it's sent from frontend
    if (req.body.isPublished === "true") req.body.isPublished = true;
    if (req.body.isPublished === "false") req.body.isPublished = false;

    // Convert price and duration to numbers
    if (req.body.price && typeof req.body.price === "string") {
      req.body.price = parseFloat(req.body.price);
    }
    if (req.body.duration && typeof req.body.duration === "string") {
      req.body.duration = parseInt(req.body.duration);
    }

    // Convert module durations to numbers
    if (req.body.modules && Array.isArray(req.body.modules)) {
      req.body.modules = req.body.modules.map((module) => ({
        ...module,
        duration: module.duration ? parseInt(module.duration) : undefined,
      }));
    }

    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Backend: Error creating course:", error);

    // Send detailed error information
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
        value: err.value,
      }));

      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: error.message,
        errors: errors,
      });
    }

    res.status(400).json({
      success: false,
      error: error.message,
      message: "Failed to create course",
    });
  }
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is course instructor or admin
  if (
    course.instructor.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this course`,
        401
      )
    );
  }

  // Helper to parse JSON string fields
  const parseJsonField = (field) => {
    if (typeof req.body[field] === "string") {
      try {
        return JSON.parse(req.body[field]);
      } catch (e) {
        console.error(`Error parsing ${field}:`, e);
        return [];
      }
    }
    return req.body[field] || [];
  };

  // Create a new body object to avoid modifying req.body directly before mongoose update
  const updatedFields = { ...req.body };

  // Parse arrays
  updatedFields.requirements = parseJsonField("requirements");
  updatedFields.objectives = parseJsonField("objectives");
  updatedFields.modules = parseJsonField("modules");

  // Handle video field properly
  if (req.file) {
    // New video file uploaded
    updatedFields.video = req.file.filename;
  } else if (
    updatedFields.video === "" ||
    updatedFields.video === "null" ||
    updatedFields.video === null
  ) {
    // Video explicitly removed or empty
    updatedFields.video = null;
  } else if (
    updatedFields.video === "undefined" ||
    updatedFields.video === undefined
  ) {
    // No change to video - keep existing
    delete updatedFields.video;
  } else if (
    typeof updatedFields.video === "string" &&
    updatedFields.video.trim() !== ""
  ) {
    // Existing video URL or filename - keep as is
    updatedFields.video = updatedFields.video.trim();
  } else {
    // Any other case (including objects) - remove from update
    delete updatedFields.video;
  }

  // Convert string booleans to actual booleans
  if (updatedFields.isActive === "true") updatedFields.isActive = true;
  if (updatedFields.isActive === "false") updatedFields.isActive = false;
  // Add isPublished conversion as well, if it's sent from frontend
  if (updatedFields.isPublished === "true") updatedFields.isPublished = true;
  if (updatedFields.isPublished === "false") updatedFields.isPublished = false;

  // Convert price and duration to numbers
  if (updatedFields.price && typeof updatedFields.price === "string") {
    updatedFields.price = parseFloat(updatedFields.price);
  }
  if (updatedFields.duration && typeof updatedFields.duration === "string") {
    updatedFields.duration = parseInt(updatedFields.duration);
  }

  // Convert module durations to numbers
  if (updatedFields.modules && Array.isArray(updatedFields.modules)) {
    updatedFields.modules = updatedFields.modules.map((module) => ({
      ...module,
      duration: module.duration ? parseInt(module.duration) : undefined,
    }));
  }


  course = await Course.findByIdAndUpdate(req.params.id, updatedFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is course instructor or admin
  if (
    course.instructor.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this course`,
        401
      )
    );
  }

  await Course.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
exports.enrollInCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if user is already enrolled
  const isEnrolled = course.enrolledUsers.some(
    (enrollment) => enrollment.user.toString() === req.user.id
  );

  if (isEnrolled) {
    return next(
      new ErrorResponse("User is already enrolled in this course", 400)
    );
  }

  // Add user to enrolled users with enrollment data
  course.enrolledUsers.push({
    user: req.user.id,
    enrolledAt: Date.now(),
    progress: 0,
    completedModules: [],
  });

  await course.save();

  // Add course to user's enrolled courses
  await User.findByIdAndUpdate(req.user.id, {
    $push: { enrolledCourses: course._id },
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc    Get enrolled users
// @route   GET /api/courses/:id/enrolled-users
// @access  Private/Admin
exports.getEnrolledUsers = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "enrolledUsers.user",
    select: "name email",
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course.enrolledUsers,
  });
});

// @desc    Unenroll from course
// @route   DELETE /api/courses/:id/unenroll
// @access  Private
exports.unenrollFromCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if user is enrolled
  const enrollmentIndex = course.enrolledUsers.findIndex(
    (enrollment) => enrollment.user.toString() === req.user.id
  );

  if (enrollmentIndex === -1) {
    return next(new ErrorResponse("User is not enrolled in this course", 400));
  }

  // Remove user from enrolled users
  course.enrolledUsers.splice(enrollmentIndex, 1);
  await course.save();

  // Remove course from user's enrolled courses
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { enrolledCourses: course._id },
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Add feedback to a course
// @route   POST /api/courses/:id/feedback
// @access  Private
exports.addFeedback = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ error: "Rating and comment are required" });
    }

    // Add new feedback
    course.feedback.push({
      rating,
      comment,
    });

    // Calculate new average rating
    course.calculateAverageRating();

    await course.save();

    res.status(201).json({
      success: true,
      data: course.feedback[course.feedback.length - 1],
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding feedback" });
  }
};

// @desc    Get feedback for a course
// @route   GET /api/courses/:id/feedback
// @access  Private
exports.getFeedback = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select(
      "feedback averageRating"
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({
      success: true,
      data: course.feedback,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching feedback" });
  }
};

// @desc    Delete feedback from a course
// @route   DELETE /api/courses/:id/feedback/:feedbackId
// @access  Private/Admin
exports.deleteFeedback = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse("Course not found", 404));
  }

  // Find the feedback index
  const feedbackIndex = course.feedback.findIndex(
    (f) => f._id.toString() === req.params.feedbackId
  );

  if (feedbackIndex === -1) {
    return next(new ErrorResponse("Feedback not found", 404));
  }

  // Remove the feedback
  course.feedback.splice(feedbackIndex, 1);

  // Recalculate average rating
  course.calculateAverageRating();

  await course.save();

  res.status(200).json({
    success: true,
    data: {},
    message: "Feedback deleted successfully",
  });
});
