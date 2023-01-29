'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sign_up = {
	email_label: "E-Mail Adresse",
	password_label: "Passwort erstellen",
	email_input_placeholder: "Ihre E-Mail Adresse",
	password_input_placeholder: "Ihr Passwort",
	button_label: "Registrieren",
	social_provider_text: "Anmelden mit",
	link_text: "Haben Sie noch kein Konto? Registrieren"
};
var sign_in = {
	email_label: "E-Mail Adresse",
	password_label: "Passwort erstellen",
	email_input_placeholder: "Ihre E-Mail Adresse",
	password_input_placeholder: "Ihr Passwort",
	button_label: "Anmelden",
	social_provider_text: "Anmelden mit",
	link_text: "Haben Sie bereits ein Konto? Anmelden"
};
var magic_link = {
	email_input_label: "E-Mail Adresse",
	email_input_placeholder: "Ihre E-Mail Adresse",
	button_label: "Magischen Link senden",
	link_text: "Einen magischen Link per E-Mail versenden"
};
var forgotten_password = {
	email_label: "E-Mail Adresse",
	password_label: "Ihr Passwort",
	email_input_placeholder: "Ihre E-Mail Adresse",
	button_label: "Anweisungen zum Zurücksetzen des Passworts senden",
	link_text: "Passwort vergessen?"
};
var update_password = {
	password_label: "Neues Passwort",
	password_input_placeholder: "Ihr neues Passwort",
	button_label: "Passwort aktualisieren"
};
var de_formal = {
	sign_up: sign_up,
	sign_in: sign_in,
	magic_link: magic_link,
	forgotten_password: forgotten_password,
	update_password: update_password
};

exports["default"] = de_formal;
exports.forgotten_password = forgotten_password;
exports.magic_link = magic_link;
exports.sign_in = sign_in;
exports.sign_up = sign_up;
exports.update_password = update_password;
