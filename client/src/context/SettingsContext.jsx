import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    church_name: 'The Church of New Generation',
    church_tagline: 'A Community of Faith, Hope, and Love',
    church_description: 'A vibrant community of believers committed to growing in faith, serving with love, and making a difference in the world.',
    phone: '+61 481 839 109',
    email: 'info@tcong.org',
    address: 'Progress Community Hall, Unit 27/59 Almurta Ave, Coolaroo VIC 3048',
    facebook_url: 'https://facebook.com',
    instagram_url: 'https://instagram.com',
    youtube_url: 'https://youtube.com',
    twitter_url: 'https://twitter.com',
    hero_heading: "Experience God's Love in Community",
    hero_subheading: 'Join us every Sunday as we worship, learn, and grow together. Everyone is welcome at The Church of New Generation.',
    bible_verse: 'For where two or three gather in my name, there am I with them.',
    bible_verse_reference: 'Matthew 18:20',
  });

  const fetchSettings = async () => {
    try {
      const res = await api.public.getSettings();
      if (res && res.data) {
        let dataObj = res.data;
        if (Array.isArray(res.data)) {
          dataObj = {};
          res.data.forEach((item) => {
            if (item.setting_key) dataObj[item.setting_key] = item.setting_value;
          });
        }
        setSettings((prev) => ({
          ...prev,
          ...dataObj,
          church_tagline: dataObj.church_tagline || dataObj.tagline || prev.church_tagline,
        }));
      }
    } catch (err) {
      console.error('Failed to load public site settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, fetchSettings, reloadSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    return {
      settings: {
        church_name: 'The Church of New Generation',
        church_tagline: 'A Community of Faith, Hope, and Love',
        church_description: 'A vibrant community of believers committed to growing in faith, serving with love, and making a difference in the world.',
        phone: '+61 481 839 109',
        email: 'info@tcong.org',
        address: 'Progress Community Hall, Unit 27/59 Almurta Ave, Coolaroo VIC 3048',
        facebook_url: 'https://facebook.com',
        instagram_url: 'https://instagram.com',
        youtube_url: 'https://youtube.com',
        twitter_url: 'https://twitter.com',
        hero_heading: "Experience God's Love in Community",
        hero_subheading: 'Join us every Sunday as we worship, learn, and grow together.',
        bible_verse: 'For where two or three gather in my name, there am I with them.',
        bible_verse_reference: 'Matthew 18:20',
      },
      fetchSettings: () => {},
      reloadSettings: () => {},
    };
  }
  return context;
};
