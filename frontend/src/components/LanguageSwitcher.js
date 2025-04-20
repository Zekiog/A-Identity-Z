import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('languageSwitcher.languages.en'), flag: '🇬🇧' },
    { code: 'no', name: t('languageSwitcher.languages.no'), flag: '🇳🇴' },
    { code: 'sv', name: t('languageSwitcher.languages.sv'), flag: '🇸🇪' },
    { code: 'da', name: t('languageSwitcher.languages.da'), flag: '🇩🇰' },
    { code: 'de', name: t('languageSwitcher.languages.de'), flag: '🇩🇪' },
    { code: 'tr', name: t('languageSwitcher.languages.tr'), flag: '🇹🇷' },
    { code: 'ar', name: t('languageSwitcher.languages.ar'), flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Menu>
        <Menu.Button 
          className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl">{currentLanguage.flag}</span>
          <span className="hidden md:inline text-white/80">{currentLanguage.name}</span>
        </Menu.Button>
        <Menu.Items 
          static
          className={`${isOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-glass-xl overflow-hidden z-50`}
        >
          <div className="py-1">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-primary-50' : ''
                    } ${
                      i18n.language === language.code ? 'bg-primary-100 text-primary-600' : ''
                    } flex items-center w-full text-left px-4 py-2 text-sm`}
                    onClick={() => changeLanguage(language.code)}
                  >
                    <span className="mr-2 text-lg">{language.flag}</span>
                    {language.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;