/**
 * Database Seeder
 * Creates initial roles, permissions, admin user, and demo content
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function runSeeders() {
  console.log('🌱 Running database seeders...\n');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tcong_db',
    multipleStatements: true
  });

  try {
    // =====================
    // 1. ROLES
    // =====================
    console.log('📌 Seeding roles...');
    await connection.query(`
      INSERT IGNORE INTO roles (name, slug, description) VALUES
        ('Super Admin', 'super_admin', 'Full access to all features'),
        ('Content Manager', 'content_manager', 'Manage blogs, sermons, pages, gallery, testimonials'),
        ('Event Manager', 'event_manager', 'Manage events and services'),
        ('Prayer Manager', 'prayer_manager', 'Manage prayer requests'),
        ('Finance Manager', 'finance_manager', 'Manage donations and finances')
    `);

    // =====================
    // 2. PERMISSIONS
    // =====================
    console.log('📌 Seeding permissions...');
    const permissionInserts = [];
    const modules = [
      'blogs', 'sermons', 'events', 'pages', 'gallery', 'testimonials',
      'prayer_requests', 'donations', 'contact', 'newsletter', 'users',
      'settings', 'media', 'services', 'ministries'
    ];
    const actions = ['create', 'read', 'update', 'delete', 'publish', 'manage'];

    for (const mod of modules) {
      for (const action of actions) {
        permissionInserts.push(`('${mod}.${action}', '${mod}.${action}', '${mod}', '${action} ${mod}')`);
      }
    }

    await connection.query(`
      INSERT IGNORE INTO permissions (name, slug, module, description) VALUES
      ${permissionInserts.join(',\n      ')}
    `);

    // =====================
    // 3. ROLE-PERMISSION MAPPING
    // =====================
    console.log('📌 Seeding role-permissions...');
    
    // Get role IDs
    const [roles] = await connection.query('SELECT id, slug FROM roles');
    const roleMap = {};
    roles.forEach(r => roleMap[r.slug] = r.id);

    // Get permission IDs
    const [perms] = await connection.query('SELECT id, slug, module FROM permissions');

    // Content Manager permissions
    const contentModules = ['blogs', 'sermons', 'pages', 'gallery', 'testimonials', 'media'];
    const contentPerms = perms.filter(p => contentModules.includes(p.module));
    for (const perm of contentPerms) {
      await connection.query(
        'INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
        [roleMap['content_manager'], perm.id]
      );
    }

    // Event Manager permissions
    const eventModules = ['events', 'services'];
    const eventPerms = perms.filter(p => eventModules.includes(p.module));
    for (const perm of eventPerms) {
      await connection.query(
        'INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
        [roleMap['event_manager'], perm.id]
      );
    }

    // Prayer Manager permissions
    const prayerPerms = perms.filter(p => p.module === 'prayer_requests');
    for (const perm of prayerPerms) {
      await connection.query(
        'INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
        [roleMap['prayer_manager'], perm.id]
      );
    }

    // Finance Manager permissions
    const financePerms = perms.filter(p => p.module === 'donations');
    for (const perm of financePerms) {
      await connection.query(
        'INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
        [roleMap['finance_manager'], perm.id]
      );
    }

    // =====================
    // 4. ADMIN USER
    // =====================
    console.log('📌 Creating admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@tcong.org';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await connection.query(`
      INSERT IGNORE INTO users (email, password_hash, first_name, last_name, role_id, is_active)
      VALUES (?, ?, 'Super', 'Admin', ?, 1)
    `, [adminEmail, passwordHash, roleMap['super_admin']]);

    // =====================
    // 5. SITE SETTINGS
    // =====================
    console.log('📌 Seeding site settings...');
    await connection.query(`
      INSERT IGNORE INTO site_settings (setting_key, setting_value, setting_group, setting_type) VALUES
        ('church_name', 'The Church of New Generation', 'general', 'text'),
        ('church_tagline', 'A Community of Faith, Hope, and Love', 'general', 'text'),
        ('church_description', 'Welcome to The Church of New Generation. We are a vibrant community of believers committed to growing in faith, serving with love, and making a difference in the world.', 'general', 'textarea'),
        ('church_logo', '', 'general', 'image'),
        ('church_favicon', '', 'general', 'image'),
        
        ('hero_heading', 'Experience God\\'s Love in Community', 'homepage', 'text'),
        ('hero_subheading', 'Join us every Sunday as we worship, learn, and grow together. Everyone is welcome at The Church of New Generation.', 'homepage', 'textarea'),
        ('hero_image', '', 'homepage', 'image'),
        ('hero_cta_primary', 'Join Us', 'homepage', 'text'),
        ('hero_cta_secondary', 'Submit a Prayer Request', 'homepage', 'text'),
        ('bible_verse', 'For where two or three gather in my name, there am I with them.', 'homepage', 'textarea'),
        ('bible_verse_reference', 'Matthew 18:20', 'homepage', 'text'),
        
        ('address', '123 Faith Street, New Delhi, India 110001', 'contact', 'text'),
        ('phone', '+91 98765 43210', 'contact', 'text'),
        ('email', 'info@tcong.org', 'contact', 'email'),
        ('maps_embed_url', '', 'contact', 'text'),
        
        ('facebook_url', 'https://facebook.com/tcong', 'social', 'url'),
        ('instagram_url', 'https://instagram.com/tcong', 'social', 'url'),
        ('youtube_url', 'https://youtube.com/@tcong', 'social', 'url'),
        ('twitter_url', 'https://twitter.com/tcong', 'social', 'url'),
        
        ('meta_title', 'The Church of New Generation | Faith, Hope, Love', 'seo', 'text'),
        ('meta_description', 'The Church of New Generation is a vibrant Christian community dedicated to worship, prayer, and service. Join us for Sunday services, events, and more.', 'seo', 'textarea'),
        ('og_image', '', 'seo', 'image')
    `);

    // =====================
    // 6. DEMO SERVICES
    // =====================
    console.log('📌 Seeding services...');
    await connection.query(`
      INSERT IGNORE INTO services (name, description, day_of_week, start_time, end_time, location, is_active, sort_order) VALUES
        ('Sunday Worship Service', 'Our main weekly gathering for worship, prayer, and the Word of God. All are welcome.', 'Sunday', '09:00:00', '11:00:00', 'Main Sanctuary', 1, 1),
        ('Sunday Evening Service', 'An intimate evening of praise, prayer, and biblical teaching.', 'Sunday', '18:00:00', '19:30:00', 'Main Sanctuary', 1, 2),
        ('Wednesday Bible Study', 'Mid-week Bible study and discussion group. Dive deeper into God\\'s Word.', 'Wednesday', '19:00:00', '20:30:00', 'Fellowship Hall', 1, 3),
        ('Friday Youth Service', 'A dynamic worship experience designed for young people aged 13-25.', 'Friday', '18:30:00', '20:00:00', 'Youth Center', 1, 4),
        ('Saturday Prayer Meeting', 'A dedicated time of corporate prayer for the church, community, and world.', 'Saturday', '07:00:00', '08:30:00', 'Prayer Room', 1, 5)
    `);

    // =====================
    // 7. DEMO BLOG CATEGORIES
    // =====================
    console.log('📌 Seeding blog categories...');
    await connection.query(`
      INSERT IGNORE INTO blog_categories (name, slug, description) VALUES
        ('Devotionals', 'devotionals', 'Daily devotional readings and reflections'),
        ('Church News', 'church-news', 'Updates and announcements from the church'),
        ('Faith & Life', 'faith-and-life', 'Articles about living out your faith'),
        ('Bible Study', 'bible-study', 'In-depth Bible study resources'),
        ('Community', 'community', 'Stories from our church community')
    `);

    // =====================
    // 8. DEMO SERMON CATEGORIES
    // =====================
    console.log('📌 Seeding sermon categories...');
    await connection.query(`
      INSERT IGNORE INTO sermon_categories (name, slug, description) VALUES
        ('Sunday Sermons', 'sunday-sermons', 'Messages from our Sunday services'),
        ('Bible Teaching', 'bible-teaching', 'In-depth biblical teaching series'),
        ('Special Events', 'special-events', 'Messages from special church events'),
        ('Guest Speakers', 'guest-speakers', 'Messages from visiting speakers'),
        ('Youth Messages', 'youth-messages', 'Messages for the younger generation')
    `);

    // =====================
    // 9. DEMO EVENT CATEGORIES
    // =====================
    console.log('📌 Seeding event categories...');
    await connection.query(`
      INSERT IGNORE INTO event_categories (name, slug, description) VALUES
        ('Worship', 'worship', 'Worship events and services'),
        ('Conference', 'conference', 'Church conferences and conventions'),
        ('Community', 'community', 'Community outreach events'),
        ('Youth', 'youth', 'Youth-focused events'),
        ('Prayer', 'prayer', 'Prayer meetings and retreats')
    `);

    // =====================
    // 10. DEMO MINISTRIES
    // =====================
    console.log('📌 Seeding ministries...');
    await connection.query(`
      INSERT IGNORE INTO ministries (name, slug, description, leader, is_active, sort_order) VALUES
        ('Worship Ministry', 'worship-ministry', 'Leading the congregation in praise and worship through music and song.', 'Worship Leader', 1, 1),
        ('Youth Ministry', 'youth-ministry', 'Empowering young people to grow in their faith and leadership skills.', 'Youth Pastor', 1, 2),
        ('Children\\'s Ministry', 'childrens-ministry', 'Nurturing children in a safe, fun environment where they learn about God\\'s love.', 'Children\\'s Director', 1, 3),
        ('Prayer Ministry', 'prayer-ministry', 'Dedicated intercessors committed to praying for the church and community.', 'Prayer Coordinator', 1, 4),
        ('Outreach Ministry', 'outreach-ministry', 'Serving the community through charitable works and evangelism.', 'Outreach Director', 1, 5),
        ('Women\\'s Ministry', 'womens-ministry', 'Building a sisterhood of faith through Bible studies, events, and support groups.', 'Women\\'s Leader', 1, 6)
    `);

    // =====================
    // 11. DEMO BLOGS
    // =====================
    console.log('📌 Seeding demo blogs...');
    const [adminUser] = await connection.query('SELECT id FROM users WHERE email = ?', [adminEmail]);
    const authorId = adminUser.length > 0 ? adminUser[0].id : 1;
    const [blogCats] = await connection.query('SELECT id, slug FROM blog_categories');
    const devCatId = blogCats.find(c => c.slug === 'devotionals')?.id || 1;
    const faithCatId = blogCats.find(c => c.slug === 'faith-and-life')?.id || 3;

    await connection.query(`
      INSERT IGNORE INTO blogs (title, slug, content, excerpt, author_id, category_id, status, is_featured, published_at) VALUES
        ('Walking in Faith: A Daily Commitment',
         'walking-in-faith-daily-commitment',
         '<p>Faith is not a one-time decision but a daily walk with God. Each morning brings new opportunities to trust Him, to lean not on our own understanding, but to acknowledge Him in all our ways.</p><p>As Proverbs 3:5-6 reminds us: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."</p><p>This daily commitment to faith transforms ordinary moments into extraordinary encounters with God\\'s grace. Whether in times of joy or seasons of challenge, our faith anchors us to something greater than ourselves.</p>',
         'Faith is not a one-time decision but a daily walk with God. Each morning brings new opportunities to trust Him.',
         ${authorId}, ${devCatId}, 'published', 1, NOW()),
        ('The Power of Community in Christian Life',
         'power-of-community-christian-life',
         '<p>God designed us for community. From the very beginning, He said it was not good for man to be alone. The early church understood this deeply — they met together, broke bread, shared their possessions, and prayed with one another.</p><p>In today\\'s fast-paced world, authentic community is more important than ever. At The Church of New Generation, we believe that spiritual growth happens best in the context of genuine relationships.</p><p>Finding your place in a church community means finding a family that celebrates your victories and carries you through your struggles.</p>',
         'God designed us for community. The early church met together, broke bread, and prayed with one another.',
         ${authorId}, ${faithCatId}, 'published', 1, NOW()),
        ('Finding Peace in Uncertain Times',
         'finding-peace-uncertain-times',
         '<p>The world often feels uncertain and overwhelming. News cycles bring anxiety, personal challenges test our resolve, and the future can seem unclear. But as followers of Christ, we have access to a peace that surpasses all understanding.</p><p>Philippians 4:6-7 teaches us: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."</p><p>This peace isn\\'t the absence of trouble — it\\'s the presence of God in the midst of trouble.</p>',
         'In uncertain times, followers of Christ have access to a peace that surpasses all understanding.',
         ${authorId}, ${devCatId}, 'published', 0, NOW())
    `);

    // =====================
    // 12. DEMO EVENTS
    // =====================
    console.log('📌 Seeding demo events...');
    const [eventCats] = await connection.query('SELECT id, slug FROM event_categories');
    const worshipCatId = eventCats.find(c => c.slug === 'worship')?.id || 1;
    const conferenceCatId = eventCats.find(c => c.slug === 'conference')?.id || 2;

    await connection.query(`
      INSERT IGNORE INTO events (title, slug, description, event_date, start_time, end_time, location, category_id, status, is_featured) VALUES
        ('Sunday Special Worship Night',
         'sunday-special-worship-night',
         'Join us for a special evening of extended worship, prayer, and God\\'s presence. This will be a powerful time of seeking the Lord together as a church family.',
         DATE_ADD(CURDATE(), INTERVAL 7 DAY), '18:00:00', '21:00:00', 'Main Sanctuary', ${worshipCatId}, 'published', 1),
        ('Annual Church Conference 2026',
         'annual-church-conference-2026',
         'Our annual church conference brings together believers from across the region for three days of inspiring messages, workshops, and fellowship. Don\\'t miss this life-changing event.',
         DATE_ADD(CURDATE(), INTERVAL 30 DAY), '09:00:00', '17:00:00', 'TCONG Convention Center', ${conferenceCatId}, 'published', 1),
        ('Community Outreach Day',
         'community-outreach-day',
         'A day dedicated to serving our local community through food drives, free health checkups, and community clean-up initiatives. Everyone is welcome to participate.',
         DATE_ADD(CURDATE(), INTERVAL 14 DAY), '08:00:00', '14:00:00', 'Church Grounds', ${eventCats.find(c => c.slug === 'community')?.id || 3}, 'published', 0)
    `);

    // =====================
    // 13. DEMO SERMONS
    // =====================
    console.log('📌 Seeding demo sermons...');
    const [sermonCats] = await connection.query('SELECT id, slug FROM sermon_categories');
    const sundaySermonCatId = sermonCats.find(c => c.slug === 'sunday-sermons')?.id || 1;

    await connection.query(`
      INSERT IGNORE INTO sermons (title, description, speaker, youtube_url, video_id, sermon_date, category_id, status, is_featured) VALUES
        ('The Foundation of Faith',
         'In this powerful message, we explore what it means to build our lives on the unshakeable foundation of faith in Jesus Christ. When storms come, only those built on the rock will stand firm.',
         'Pastor Name', '', '', CURDATE(), ${sundaySermonCatId}, 'published', 1),
        ('Grace That Transforms',
         'Discover how God\\'s amazing grace is not just a theological concept but a transformative power that changes hearts, restores relationships, and renews minds.',
         'Pastor Name', '', '', DATE_SUB(CURDATE(), INTERVAL 7 DAY), ${sundaySermonCatId}, 'published', 1),
        ('Living with Purpose',
         'God created each of us with a unique purpose. This message explores how to discover, develop, and deploy your God-given purpose for maximum impact in the Kingdom.',
         'Pastor Name', '', '', DATE_SUB(CURDATE(), INTERVAL 14 DAY), ${sundaySermonCatId}, 'published', 0)
    `);

    // =====================
    // 14. DEMO TESTIMONIALS
    // =====================
    console.log('📌 Seeding demo testimonials...');
    await connection.query(`
      INSERT IGNORE INTO testimonials (name, testimonial_text, category, is_featured, status) VALUES
        ('A Grateful Member', 'The Church of New Generation has been a tremendous blessing to my family. The warmth and love we experienced from the first day made us feel at home. The teaching has helped us grow spiritually in ways we never imagined.', 'General', 1, 'published'),
        ('A Young Believer', 'I came to this church searching for answers and found so much more — a family, a purpose, and a deeper relationship with God. The youth ministry has been life-changing for me.', 'Youth', 1, 'published'),
        ('A Community Member', 'Even though I was not a regular churchgoer, the community outreach programs touched my life deeply. The genuine care and service showed me what true Christianity looks like.', 'Outreach', 1, 'published')
    `);

    // =====================
    // 15. SEO METADATA
    // =====================
    console.log('📌 Seeding SEO metadata...');
    await connection.query(`
      INSERT IGNORE INTO seo_metadata (page_identifier, meta_title, meta_description) VALUES
        ('home', 'The Church of New Generation | Faith, Hope, Love', 'Welcome to The Church of New Generation. Join our vibrant community for worship, prayer, events, and spiritual growth.'),
        ('about', 'About Us | The Church of New Generation', 'Learn about The Church of New Generation — our mission, vision, values, and the leadership team guiding our community.'),
        ('events', 'Events | The Church of New Generation', 'Discover upcoming events, conferences, and community gatherings at The Church of New Generation.'),
        ('sermons', 'Sermons | The Church of New Generation', 'Watch and listen to powerful sermons and messages from The Church of New Generation.'),
        ('blog', 'Blog | The Church of New Generation', 'Read inspiring articles, devotionals, and church news from The Church of New Generation.'),
        ('prayer-request', 'Prayer Request | The Church of New Generation', 'Submit your prayer request to The Church of New Generation. Our prayer team is here for you.'),
        ('donate', 'Give | The Church of New Generation', 'Support the ministry of The Church of New Generation through your generous donations.'),
        ('contact', 'Contact Us | The Church of New Generation', 'Get in touch with The Church of New Generation. We would love to hear from you.'),
        ('gallery', 'Gallery | The Church of New Generation', 'Browse photos from services, events, and community life at The Church of New Generation.'),
        ('testimonials', 'Testimonials | The Church of New Generation', 'Read inspiring testimonials from members of The Church of New Generation community.')
    `);

    console.log('\n🎉 All seed data loaded successfully!');
    console.log(`\n📋 Admin Login Credentials:`);
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`\n⚠️  Change the admin password after first login!\n`);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

runSeeders();
