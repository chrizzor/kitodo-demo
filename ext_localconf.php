<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

\FluidTYPO3\Flux\Core::registerProviderExtensionKey('Kitodo.PresentationPackage', 'Content');
\FluidTYPO3\Flux\Core::registerProviderExtensionKey('Kitodo.PresentationPackage', 'Page');

//\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile('presentation_package','Configuration/TypoScript', 'Presentation Package');

// Override language files
$GLOBALS['TYPO3_CONF_VARS']['SYS']['locallangXMLOverride']['EXT:dlf/Resources/Private/Language/locallang_metadata.xlf'][] = 'EXT:presentation_package/Resources/Private/Language/Overrides/locallang_metadata.xlf';
$GLOBALS['TYPO3_CONF_VARS']['SYS']['locallangXMLOverride']['de']['EXT:dlf/Resources/Private/Language/locallang_metadata.xlf'][] = 'EXT:presentation_package/Resources/Private/Language/Overrides/de.locallang_metadata.xlf';

$GLOBALS['TYPO3_CONF_VARS']['SYS']['locallangXMLOverride']['EXT:dlf/Resources/Private/Language/locallang_structure.xlf'][] = 'EXT:presentation_package/Resources/Private/Language/Overrides/locallang_structure.xlf';
$GLOBALS['TYPO3_CONF_VARS']['SYS']['locallangXMLOverride']['de']['EXT:dlf/Resources/Private/Language/locallang_structure.xlf'][] = 'EXT:presentation_package/Resources/Private/Language/Overrides/de.locallang_structure.xlf';
