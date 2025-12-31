// POSTS array - Edit this to add/update posts
const POSTS = [
  {
    title: "A Mind Under Training: Coming soon",
    // url: "https://example.com/a-mind-under-training-manifesto",
    date: "2025-01-15",
    readingTime: "7 min",
    // summary: "A short manifesto on intelligence as lived experience—perception, constraint, and learning under pressure.",
    tags: ["Human", "Machine","Training", "Theory"]
  }
  // {
  //   title: "The Geometry of Perception",
  //   url: "https://example.com/geometry-of-perception",
  //   date: "2024-12-10",
  //   readingTime: "12 min",
  //   summary: "How spatial representations emerge in both biological and artificial vision systems, and what they reveal about the nature of perception.",
  //   tags: ["Human", "Machine", "Theory"]
  // },
  // {
  //   title: "Learning Under Constraints",
  //   url: "https://example.com/learning-under-constraints",
  //   date: "2024-11-22",
  //   readingTime: "10 min",
  //   summary: "Exploring how constraints shape learning in neural networks and human cognition—when limitations become features.",
  //   tags: ["Machine", "Training", "Theory"]
  // },
  // {
  //   title: "From Simulation to Reality: The Alignment Problem",
  //   url: "https://example.com/sim-to-real-alignment",
  //   date: "2024-10-05",
  //   readingTime: "15 min",
  //   summary: "Why real-to-sim translation matters for robotics, and what it teaches us about the gap between models and the world.",
  //   tags: ["Machine", "Training"]
  // },
  // {
  //   title: "Attention as a Computational Primitive",
  //   url: "https://example.com/attention-primitive",
  //   date: "2024-09-18",
  //   readingTime: "9 min",
  //   summary: "What attention mechanisms reveal about how minds—biological and artificial—select and process information.",
  //   tags: ["Machine", "Theory"]
  // },
  // {
  //   title: "Embodied Intelligence: Beyond the Brain",
  //   url: "https://example.com/embodied-intelligence",
  //   date: "2024-08-30",
  //   readingTime: "11 min",
  //   summary: "How embodiment shapes intelligence in robots and animals, and why purely cognitive models miss something fundamental.",
  //   tags: ["Human", "Machine", "Theory"]
  // },
  // {
  //   title: "The Cost of Generalization",
  //   url: "https://example.com/cost-of-generalization",
  //   date: "2024-07-14",
  //   readingTime: "8 min",
  //   summary: "What it means for a system to generalize, and why perfect generalization might be impossible—or undesirable.",
  //   tags: ["Machine", "Training"]
  // },
  // {
  //   title: "Temporal Dynamics in Learning",
  //   url: "https://example.com/temporal-dynamics",
  //   date: "2024-06-25",
  //   readingTime: "13 min",
  //   summary: "How time shapes learning: from gradient descent schedules to developmental windows in biological systems.",
  //   tags: ["Human", "Training", "Theory"]
  // }
];

// Get all unique tags from posts
function getAllTags() {
  const tagSet = new Set();
  POSTS.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Format date for archive (year only)
function getYear(dateString) {
  return new Date(dateString).getFullYear();
}

// Initialize hero title typing animation
function initHeroTitle() {
  const line1 = document.getElementById('hero-line-1');
  const line2 = document.getElementById('hero-line-2');
  const line3 = document.getElementById('hero-line-3');
  
  const text1 = "A Mind";
  const text2 = "Under";
  const text3 = "Training";
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Show all text immediately without animation
    line1.textContent = text1;
    line2.textContent = text2;
    line3.textContent = text3;
    line1.style.opacity = '1';
    line2.style.opacity = '1';
    line3.style.opacity = '1';
    return;
  }
  
  // Type first line
  setTimeout(function() {
    line1.textContent = text1;
    line1.style.setProperty('--chars', text1.length);
    line1.style.setProperty('--duration', '0.6s');
    line1.classList.add('typing');
    
    setTimeout(function() {
      line1.classList.remove('typing');
      line1.classList.add('done');
      
      // Type second line
      setTimeout(function() {
        line2.textContent = text2;
        line2.style.setProperty('--chars', text2.length);
        line2.style.setProperty('--duration', '0.5s');
        line2.classList.add('typing');
        
        setTimeout(function() {
          line2.classList.remove('typing');
          line2.classList.add('done');
          
          // Type third line
          setTimeout(function() {
            line3.textContent = text3;
            line3.style.setProperty('--chars', text3.length);
            line3.style.setProperty('--duration', '0.8s');
            line3.classList.add('typing');
            
            setTimeout(function() {
              line3.classList.remove('typing');
              line3.classList.add('done');
            }, 900);
          }, 300);
        }, 600);
      }, 300);
    }, 700);
  }, 500);
}

// Render post cards
function renderPosts(posts) {
  const container = document.getElementById('posts-container');
  container.innerHTML = '';

  if (posts.length === 0) {
    container.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 40px;">No posts found.</p>';
    return;
  }

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.onclick = () => window.open(post.url, '_blank');

    const tagsHtml = post.tags.map(tag => 
      `<span class="post-tag">${tag}</span>`
    ).join('');

    card.innerHTML = `
      <h3 class="post-title">${post.title}</h3>
      <p class="post-summary">${post.summary}</p>
      <div class="post-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.readingTime}</span>
      </div>
      <div class="post-tags">${tagsHtml}</div>
    `;

    container.appendChild(card);
  });
}

// Render tag filters
function renderTagFilters() {
  const container = document.getElementById('tag-filters');
  const tags = getAllTags();
  
  const allPill = document.createElement('span');
  allPill.className = 'tag-pill active';
  allPill.textContent = 'All';
  allPill.onclick = () => filterByTag(null);
  container.appendChild(allPill);

  tags.forEach(tag => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.textContent = tag;
    pill.onclick = () => filterByTag(tag);
    container.appendChild(pill);
  });
}

// Filter posts by tag
let currentTag = null;
function filterByTag(tag) {
  currentTag = tag;
  
  // Update active state
  document.querySelectorAll('.tag-pill').forEach(pill => {
    pill.classList.remove('active');
    if ((tag === null && pill.textContent === 'All') || 
        (tag !== null && pill.textContent === tag)) {
      pill.classList.add('active');
    }
  });

  // Filter and render
  let filtered = POSTS;
  if (tag) {
    filtered = POSTS.filter(post => post.tags.includes(tag));
  }
  
  // Apply search filter if active
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.summary.toLowerCase().includes(searchTerm) ||
      post.tags.some(t => t.toLowerCase().includes(searchTerm))
    );
  }

  renderPosts(filtered);
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('search-input');
  let searchTimeout;

  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = this.value.toLowerCase();
      
      let filtered = POSTS;
      
      // Apply tag filter
      if (currentTag) {
        filtered = filtered.filter(post => post.tags.includes(currentTag));
      }
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(searchTerm) ||
          post.summary.toLowerCase().includes(searchTerm) ||
          post.tags.some(t => t.toLowerCase().includes(searchTerm))
        );
      }

      renderPosts(filtered);
    }, 300);
  });
}

// Render archive
function renderArchive() {
  const container = document.getElementById('archive-container');
  const postsByYear = {};

  POSTS.forEach(post => {
    const year = getYear(post.date);
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  // Sort years descending
  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  years.forEach(year => {
    const yearDiv = document.createElement('div');
    yearDiv.className = 'archive-year';

    const yearTitle = document.createElement('h3');
    yearTitle.className = 'archive-year-title';
    yearTitle.textContent = year;
    yearDiv.appendChild(yearTitle);

    const postsDiv = document.createElement('div');
    postsDiv.className = 'archive-year-posts';

    // Sort posts by date (newest first)
    const yearPosts = postsByYear[year].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );

    yearPosts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.className = 'archive-post';

      const link = document.createElement('a');
      link.className = 'archive-post-link';
      link.href = post.url;
      link.target = '_blank';
      link.onclick = (e) => {
        e.stopPropagation();
      };

      const title = document.createElement('span');
      title.className = 'archive-post-title';
      title.textContent = post.title;

      const date = document.createElement('span');
      date.className = 'archive-post-date';
      date.textContent = formatDate(post.date);

      link.appendChild(title);
      link.appendChild(date);
      postDiv.appendChild(link);
      postsDiv.appendChild(postDiv);
    });

    yearDiv.appendChild(postsDiv);
    container.appendChild(yearDiv);
  });
}

// Render tags section
function renderTagsSection() {
  const container = document.getElementById('tags-container');
  const tags = getAllTags();

  tags.forEach(tag => {
    const chip = document.createElement('span');
    chip.className = 'tag-chip';
    chip.textContent = tag;
    chip.onclick = () => {
      filterByTag(tag);
      document.getElementById('posts').scrollIntoView({ behavior: 'smooth' });
    };
    container.appendChild(chip);
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Initialize hero media
function initHeroMedia() {
  const video = document.getElementById('hero-video');
  const image = document.getElementById('hero-image');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Default: show image (GIF)
  video.style.display = 'none';
  image.style.display = 'block';

  if (prefersReducedMotion) {
    // Don't autoplay video if reduced motion is preferred
    return;
  }

  // Check if video source exists and try to load it
  const videoSource = video.querySelector('source');
  if (videoSource && videoSource.src) {
    // Try to load video
    video.addEventListener('loadeddata', function() {
      // Video loaded successfully, show it
      video.style.display = 'block';
      image.style.display = 'none';
      video.setAttribute('autoplay', '');
      video.play().catch(function() {
        // If autoplay fails, keep showing image
        video.style.display = 'none';
        image.style.display = 'block';
      });
    }, { once: true });

    video.addEventListener('error', function() {
      // Video failed to load, keep showing image
      video.style.display = 'none';
      image.style.display = 'block';
    }, { once: true });

    // Try to load the video
    video.load();
  }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  initHeroMedia();
  initHeroTitle();
  renderTagFilters();
  renderPosts(POSTS);
  initSearch();
  renderArchive();
  renderTagsSection();
  initSmoothScroll();
});

