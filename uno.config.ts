import { mergeConfigs } from '@unocss/core';
import uiconfig from './packages/ui/uno.config';
import appconfig from './apps/sass/uno.config';

export default mergeConfigs([uiconfig, appconfig]);
