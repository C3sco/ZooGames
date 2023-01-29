'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Auth = require('./components/Auth/Auth.js');
var MagicLink = require('./components/Auth/interfaces/MagicLink.js');
var SocialAuth = require('./components/Auth/interfaces/SocialAuth.js');
var EmailAuth = require('./components/Auth/interfaces/EmailAuth.js');
var ForgottenPassword = require('./components/Auth/interfaces/ForgottenPassword.js');
var UpdatePassword = require('./components/Auth/interfaces/UpdatePassword.js');
var defaultThemes = require('../common/theming/defaultThemes.js');
var de_formal = require('../common/lib/Localization/de_formal.json.js');
var de_informal = require('../common/lib/Localization/de_informal.json.js');
var en = require('../common/lib/Localization/en.json.js');
var ja = require('../common/lib/Localization/ja.json.js');



exports.Auth = Auth["default"];
exports.getCssText = Auth.getCssText;
exports.MagicLink = MagicLink.MagicLink;
exports.SocialAuth = SocialAuth.SocialAuth;
exports.EmailAuth = EmailAuth.EmailAuth;
exports.ForgottenPassword = ForgottenPassword.ForgottenPassword;
exports.UpdatePassword = UpdatePassword.UpdatePassword;
exports.ThemeMinimal = defaultThemes.ThemeMinimal;
exports.ThemeSupa = defaultThemes.ThemeSupa;
exports.de_formal = de_formal["default"];
exports.de_informal = de_informal["default"];
exports.en = en["default"];
exports.ja = ja["default"];
