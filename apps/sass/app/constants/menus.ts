import type { NavMenu, NavMenuItems } from '~/types/nav';

export const navMenu: NavMenu[] = [
  {
    heading: 'Pages',
    items: [
      {
        title: 'Inbox',
        icon: `<svg xmlns="http://www.w3.org/2000/svg"  width="1em" height="1em" viewBox="0 0 20 21" fill="none" class="!size-5">
<path d="M14.0846 16.3424C13.8263 16.3424 13.568 16.2674 13.343 16.1174L12.543 15.5924C12.318 15.4424 12.2096 15.1591 12.2846 14.9008C12.343 14.7091 12.368 14.4841 12.368 14.2341V10.8424C12.368 9.48408 11.518 8.63411 10.1596 8.63411H4.5013C4.4013 8.63411 4.30963 8.64246 4.21797 8.6508C4.04297 8.65913 3.87631 8.60079 3.74297 8.48412C3.60964 8.36745 3.54297 8.2008 3.54297 8.0258V5.71745C3.54297 3.26745 5.25964 1.55078 7.70964 1.55078H14.793C17.243 1.55078 18.9596 3.26745 18.9596 5.71745V9.96743C18.9596 11.1758 18.5513 12.2424 17.8013 12.9757C17.2013 13.5841 16.368 13.9758 15.418 14.0924V15.0174C15.418 15.5174 15.143 15.9675 14.7096 16.2008C14.5096 16.2925 14.293 16.3424 14.0846 16.3424ZM13.5846 14.7758L14.1263 15.0841C14.1763 15.0591 14.1763 15.0174 14.1763 15.0091V13.5008C14.1763 13.1591 14.4596 12.8758 14.8013 12.8758C15.6763 12.8758 16.418 12.6008 16.9263 12.0841C17.4513 11.5675 17.718 10.8341 17.718 9.95909V5.70911C17.718 3.93411 16.5763 2.79244 14.8013 2.79244H7.71796C5.94296 2.79244 4.8013 3.93411 4.8013 5.70911V7.37577H10.168C12.2013 7.37577 13.6263 8.80079 13.6263 10.8341V14.2257C13.618 14.4174 13.6096 14.6008 13.5846 14.7758Z" fill="#85888E"/>
<path d="M5.05964 19.4583C4.87631 19.4583 4.68464 19.4167 4.50964 19.325C4.11797 19.1167 3.8763 18.7167 3.8763 18.2667V17.6333C3.14296 17.5167 2.49297 17.2083 2.00964 16.725C1.37631 16.0916 1.04297 15.225 1.04297 14.225V10.8334C1.04297 8.95002 2.2763 7.56668 4.10963 7.39168C4.24296 7.38335 4.36796 7.375 4.5013 7.375H10.1596C12.193 7.375 13.618 8.80002 13.618 10.8334V14.225C13.618 14.5916 13.5763 14.9333 13.4846 15.2417C13.1096 16.7417 11.8346 17.6833 10.1596 17.6833H8.08463L5.7263 19.25C5.5263 19.3917 5.29297 19.4583 5.05964 19.4583ZM4.5013 8.625C4.4013 8.625 4.30963 8.63335 4.21797 8.64168C3.01797 8.75002 2.29297 9.57502 2.29297 10.8334V14.225C2.29297 14.8916 2.5013 15.45 2.89297 15.8416C3.2763 16.225 3.83463 16.4333 4.5013 16.4333C4.84296 16.4333 5.1263 16.7167 5.1263 17.0583V18.15L7.54297 16.5417C7.64297 16.475 7.76797 16.4333 7.89297 16.4333H10.1596C11.2596 16.4333 12.0346 15.8833 12.2763 14.9167C12.3346 14.7083 12.368 14.475 12.368 14.225V10.8334C12.368 9.47502 11.518 8.625 10.1596 8.625H4.5013Z" fill="#85888E"/>
</svg>`,
        link: '/dashboard/conversations',
      },
      {
        title: 'Campaign Manager',
        icon: 'i-hugeicons:megaphone-02',
        link: '/dashboard/campaign-manager',
      },
      {
        title: 'Team Members',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 21" fill="none" class="!size-5">
<path d="M14.999 7.09246C14.974 7.09246 14.9573 7.09246 14.9323 7.09246H14.8906C13.3156 7.04246 12.1406 5.82578 12.1406 4.32578C12.1406 2.79245 13.3906 1.55078 14.9156 1.55078C16.4406 1.55078 17.6906 2.80078 17.6906 4.32578C17.6823 5.83412 16.5073 7.05078 15.0073 7.10078C15.0073 7.09245 15.0073 7.09246 14.999 7.09246ZM14.9156 2.79245C14.074 2.79245 13.3906 3.47579 13.3906 4.31745C13.3906 5.14245 14.0323 5.80912 14.8573 5.84246C14.8656 5.83412 14.9323 5.83412 15.0073 5.84246C15.8156 5.80079 16.4406 5.13412 16.449 4.31745C16.449 3.47579 15.7656 2.79245 14.9156 2.79245Z" fill="#85888E"/>
<path d="M15.0097 13.2339C14.6847 13.2339 14.3597 13.2089 14.0347 13.1505C13.6931 13.0922 13.4681 12.7672 13.5264 12.4255C13.5847 12.0839 13.9097 11.8589 14.2514 11.9172C15.2764 12.0922 16.3597 11.9005 17.0847 11.4172C17.4764 11.1589 17.6847 10.8339 17.6847 10.5089C17.6847 10.1839 17.4681 9.86719 17.0847 9.60886C16.3597 9.12553 15.2597 8.93386 14.2264 9.1172C13.8847 9.18386 13.5597 8.95053 13.5014 8.60886C13.4431 8.2672 13.6681 7.9422 14.0097 7.88387C15.3681 7.6422 16.7764 7.90053 17.7764 8.56719C18.5097 9.05886 18.9347 9.75886 18.9347 10.5089C18.9347 11.2505 18.5181 11.9589 17.7764 12.4589C17.0181 12.9589 16.0347 13.2339 15.0097 13.2339Z" fill="#85888E"/>
<path d="M4.97344 7.09102C4.96511 7.09102 4.95677 7.09102 4.95677 7.09102C3.45677 7.04102 2.28177 5.82435 2.27344 4.32435C2.27344 2.79101 3.52344 1.54102 5.04844 1.54102C6.57344 1.54102 7.82344 2.79102 7.82344 4.31602C7.82344 5.82435 6.64844 7.04102 5.14844 7.09102L4.97344 6.46602L5.03177 7.09102C5.01511 7.09102 4.99011 7.09102 4.97344 7.09102ZM5.05677 5.84102C5.10677 5.84102 5.14844 5.84101 5.19844 5.84935C5.94011 5.81601 6.5901 5.14935 6.5901 4.32435C6.5901 3.48268 5.90677 2.79934 5.06511 2.79934C4.22344 2.79934 3.5401 3.48268 3.5401 4.32435C3.5401 5.14101 4.17344 5.79935 4.98177 5.84935C4.9901 5.84101 5.02344 5.84102 5.05677 5.84102Z" fill="#85888E"/>
<path d="M4.96797 13.2339C3.94297 13.2339 2.95964 12.9589 2.2013 12.4589C1.46797 11.9672 1.04297 11.2589 1.04297 10.5089C1.04297 9.76719 1.46797 9.05886 2.2013 8.56719C3.2013 7.90053 4.60964 7.6422 5.96797 7.88387C6.30964 7.9422 6.53464 8.2672 6.4763 8.60886C6.41797 8.95053 6.09297 9.18386 5.7513 9.1172C4.71797 8.93386 3.6263 9.12553 2.89297 9.60886C2.5013 9.86719 2.29297 10.1839 2.29297 10.5089C2.29297 10.8339 2.50964 11.1589 2.89297 11.4172C3.61797 11.9005 4.7013 12.0922 5.7263 11.9172C6.06797 11.8589 6.39297 12.0922 6.4513 12.4255C6.50964 12.7672 6.28464 13.0922 5.94297 13.1505C5.61797 13.2089 5.29297 13.2339 4.96797 13.2339Z" fill="#85888E"/>
<path d="M9.99896 13.3171C9.97396 13.3171 9.95729 13.3171 9.93229 13.3171H9.89062C8.31562 13.2671 7.14062 12.0504 7.14062 10.5504C7.14062 9.01706 8.39063 7.77539 9.91563 7.77539C11.4406 7.77539 12.6906 9.02539 12.6906 10.5504C12.6823 12.0587 11.5073 13.2754 10.0073 13.3254C10.0073 13.3171 10.0073 13.3171 9.99896 13.3171ZM9.91563 9.01706C9.07396 9.01706 8.39062 9.7004 8.39062 10.5421C8.39062 11.3671 9.03229 12.0337 9.85729 12.0671C9.86563 12.0587 9.93229 12.0587 10.0073 12.0671C10.8156 12.0254 11.4406 11.3587 11.449 10.5421C11.449 9.70873 10.7656 9.01706 9.91563 9.01706Z" fill="#85888E"/>
<path d="M9.99974 19.4676C8.99974 19.4676 7.99974 19.2093 7.22474 18.6843C6.49141 18.1926 6.06641 17.4926 6.06641 16.7426C6.06641 16.0009 6.48307 15.2842 7.22474 14.7926C8.78307 13.7592 11.2247 13.7592 12.7747 14.7926C13.5081 15.2842 13.9331 15.9842 13.9331 16.7342C13.9331 17.4759 13.5164 18.1926 12.7747 18.6843C11.9997 19.2009 10.9997 19.4676 9.99974 19.4676ZM7.91641 15.8426C7.52474 16.1009 7.31641 16.4259 7.31641 16.7509C7.31641 17.0759 7.53307 17.3926 7.91641 17.6509C9.04141 18.4093 10.9497 18.4093 12.0747 17.6509C12.4664 17.3926 12.6747 17.0676 12.6747 16.7426C12.6747 16.4176 12.4581 16.1009 12.0747 15.8426C10.9581 15.0843 9.04974 15.0926 7.91641 15.8426Z" fill="#85888E"/>
</svg>`,
        link: '/dashboard/settings/agents',
      },
      {
        title: 'Reports',
        icon: 'i-hugeicons:analytics-01',
        link: '/dashboard',
      },
      // {
      //   title: 'Conversations',
      //   icon: 'i-hugeicons:message-01',
      //   link: '/dashboard/conversations',
      // },

      // {
      //   title: 'Team Members',
      //   icon: 'i-hugeicons:user-group-02',
      //   link: '/dashboard/team-members',
      // },
      {
        title: 'Contacts',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 21" fill="none" class="!size-5">
<path d="M12.5005 19.4593H7.50053C6.40053 19.4593 5.48386 19.351 4.70886 19.1176C4.42553 19.0343 4.24219 18.7593 4.25886 18.4676C4.46719 15.9759 6.99219 14.0176 10.0005 14.0176C13.0089 14.0176 15.5255 15.9676 15.7422 18.4676C15.7672 18.7676 15.5839 19.0343 15.2922 19.1176C14.5172 19.351 13.6005 19.4593 12.5005 19.4593ZM5.60053 18.0509C6.15053 18.1593 6.77553 18.2093 7.50053 18.2093H12.5005C13.2255 18.2093 13.8505 18.1593 14.4005 18.0509C13.9589 16.4509 12.1339 15.2676 10.0005 15.2676C7.86719 15.2676 6.0422 16.4509 5.60053 18.0509Z" fill="#85888E"/>
<path d="M12.5013 2.16602H7.5013C3.33464 2.16602 1.66797 3.83268 1.66797 7.99935V12.9993C1.66797 16.1493 2.61797 17.8743 4.88464 18.516C5.06797 16.3493 7.29297 14.641 10.0013 14.641C12.7096 14.641 14.9346 16.3493 15.118 18.516C17.3846 17.8743 18.3346 16.1493 18.3346 12.9993V7.99935C18.3346 3.83268 16.668 2.16602 12.5013 2.16602ZM10.0013 12.3077C8.3513 12.3077 7.01797 10.966 7.01797 9.31603C7.01797 7.66603 8.3513 6.33268 10.0013 6.33268C11.6513 6.33268 12.9846 7.66603 12.9846 9.31603C12.9846 10.966 11.6513 12.3077 10.0013 12.3077Z" stroke="#85888E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99896 12.934C8.00729 12.934 6.39062 11.309 6.39062 9.31733C6.39062 7.32567 8.00729 5.70898 9.99896 5.70898C11.9906 5.70898 13.6073 7.32567 13.6073 9.31733C13.6073 11.309 11.9906 12.934 9.99896 12.934ZM9.99896 6.95898C8.69896 6.95898 7.64062 8.01733 7.64062 9.31733C7.64062 10.6257 8.69896 11.684 9.99896 11.684C11.299 11.684 12.3573 10.6257 12.3573 9.31733C12.3573 8.01733 11.299 6.95898 9.99896 6.95898Z" fill="#85888E"/>
</svg>`,
        link: '/dashboard/contacts',
      },
    ],
  },
  {
    heading: 'General',
    items: [
      {
        title: 'Settings',
        icon: 'i-hugeicons-settings-01',
        children: [
          {
            title: 'Labels',
            icon: 'i-lucide-circle',
            link: '/dashboard/settings/labels',
          },
          {
            title: 'Bots',
            icon: 'i-lucide-circle',
            link: '/dashboard/settings/bots',
          },
          {
            title: 'Channels',
            icon: 'i-lucide-circle',
            link: '/dashboard/settings/channels',
          },
          {
            title: 'Workspaces',
            icon: 'i-lucide-circle',
            link: '/dashboard/settings/workspaces',
          },
          {
            title: 'Agents',
            icon: 'i-lucide-circle',
            link: '/dashboard/settings/agents',
          },
        ],
      },
    ],
  },
  // {
  //   heading: 'Components',
  //   items: [
  //     {
  //       title: 'Components',
  //       icon: 'i-lucide-component',
  //       children: [
  //         {
  //           title: 'Accordion',
  //           icon: 'i-lucide-circle',
  //           link: '/components/accordion',
  //         },
  //         {
  //           title: 'Alert',
  //           icon: 'i-lucide-circle',
  //           link: '/components/alert',
  //         },
  //         {
  //           title: 'Alert Dialog',
  //           icon: 'i-lucide-circle',
  //           link: '/components/alert-dialog',
  //         },
  //         {
  //           title: 'Aspect Ratio',
  //           icon: 'i-lucide-circle',
  //           link: '/components/aspect-ratio',
  //         },
  //         {
  //           title: 'Avatar',
  //           icon: 'i-lucide-circle',
  //           link: '/components/avatar',
  //         },
  //         {
  //           title: 'Badge',
  //           icon: 'i-lucide-circle',
  //           link: '/components/badge',
  //         },
  //         {
  //           title: 'Breadcrumb',
  //           icon: 'i-lucide-circle',
  //           link: '/components/breadcrumb',
  //         },
  //         {
  //           title: 'Button',
  //           icon: 'i-lucide-circle',
  //           link: '/components/button',
  //         },
  //         {
  //           title: 'Calendar',
  //           icon: 'i-lucide-circle',
  //           link: '/components/calendar',
  //         },
  //         {
  //           title: 'Card',
  //           icon: 'i-lucide-circle',
  //           link: '/components/card',
  //         },
  //         {
  //           title: 'Carousel',
  //           icon: 'i-lucide-circle',
  //           link: '/components/carousel',
  //         },
  //         {
  //           title: 'Checkbox',
  //           icon: 'i-lucide-circle',
  //           link: '/components/checkbox',
  //         },
  //         {
  //           title: 'Collapsible',
  //           icon: 'i-lucide-circle',
  //           link: '/components/collapsible',
  //         },
  //         {
  //           title: 'Combobox',
  //           icon: 'i-lucide-circle',
  //           link: '/components/combobox',
  //         },
  //         {
  //           title: 'Command',
  //           icon: 'i-lucide-circle',
  //           link: '/components/command',
  //         },
  //         {
  //           title: 'Context Menu',
  //           icon: 'i-lucide-circle',
  //           link: '/components/context-menu',
  //         },
  //         {
  //           title: 'Dialog',
  //           icon: 'i-lucide-circle',
  //           link: '/components/dialog',
  //         },
  //         {
  //           title: 'Drawer',
  //           icon: 'i-lucide-circle',
  //           link: '/components/drawer',
  //         },
  //         {
  //           title: 'Dropdown Menu',
  //           icon: 'i-lucide-circle',
  //           link: '/components/dropdown-menu',
  //         },
  //         {
  //           title: 'Form',
  //           icon: 'i-lucide-circle',
  //           link: '/components/form',
  //         },
  //         {
  //           title: 'Hover Card',
  //           icon: 'i-lucide-circle',
  //           link: '/components/hover-card',
  //         },
  //         {
  //           title: 'Input',
  //           icon: 'i-lucide-circle',
  //           link: '/components/input',
  //         },
  //         {
  //           title: 'Label',
  //           icon: 'i-lucide-circle',
  //           link: '/components/label',
  //         },
  //         {
  //           title: 'Menubar',
  //           icon: 'i-lucide-circle',
  //           link: '/components/menubar',
  //         },
  //         {
  //           title: 'Navigation Menu',
  //           icon: 'i-lucide-circle',
  //           link: '/components/navigation-menu',
  //         },
  //         {
  //           title: 'Number Field',
  //           icon: 'i-lucide-circle',
  //           link: '/components/number-field',
  //         },
  //         {
  //           title: 'Pagination',
  //           icon: 'i-lucide-circle',
  //           link: '/components/pagination',
  //         },
  //         {
  //           title: 'PIN Input',
  //           icon: 'i-lucide-circle',
  //           link: '/components/pin-input',
  //         },
  //         {
  //           title: 'Popover',
  //           icon: 'i-lucide-circle',
  //           link: '/components/popover',
  //         },
  //         {
  //           title: 'Progress',
  //           icon: 'i-lucide-circle',
  //           link: '/components/progress',
  //         },
  //         {
  //           title: 'Radio Group',
  //           icon: 'i-lucide-circle',
  //           link: '/components/radio-group',
  //         },
  //         {
  //           title: 'Range Calendar',
  //           icon: 'i-lucide-circle',
  //           link: '/components/range-calendar',
  //         },
  //         {
  //           title: 'Resizable',
  //           icon: 'i-lucide-circle',
  //           link: '/components/resizable',
  //         },
  //         {
  //           title: 'Scroll Area',
  //           icon: 'i-lucide-circle',
  //           link: '/components/scroll-area',
  //         },
  //         {
  //           title: 'Select',
  //           icon: 'i-lucide-circle',
  //           link: '/components/select',
  //         },
  //         {
  //           title: 'Separator',
  //           icon: 'i-lucide-circle',
  //           link: '/components/separator',
  //         },
  //         {
  //           title: 'Sheet',
  //           icon: 'i-lucide-circle',
  //           link: '/components/sheet',
  //         },
  //         {
  //           title: 'Skeleton',
  //           icon: 'i-lucide-circle',
  //           link: '/components/skeleton',
  //         },
  //         {
  //           title: 'Slider',
  //           icon: 'i-lucide-circle',
  //           link: '/components/slider',
  //         },
  //         {
  //           title: 'Sonner',
  //           icon: 'i-lucide-circle',
  //           link: '/components/sonner',
  //         },
  //         {
  //           title: 'Stepper',
  //           icon: 'i-lucide-circle',
  //           link: '/components/stepper',
  //           new: true,
  //         },
  //         {
  //           title: 'Switch',
  //           icon: 'i-lucide-circle',
  //           link: '/components/switch',
  //         },
  //         {
  //           title: 'Table',
  //           icon: 'i-lucide-circle',
  //           link: '/components/table',
  //         },
  //         {
  //           title: 'Tabs',
  //           icon: 'i-lucide-circle',
  //           link: '/components/tabs',
  //         },
  //         {
  //           title: 'Tags Input',
  //           icon: 'i-lucide-circle',
  //           link: '/components/tags-input',
  //         },
  //         {
  //           title: 'Textarea',
  //           icon: 'i-lucide-circle',
  //           link: '/components/textarea',
  //         },
  //         {
  //           title: 'Toast',
  //           icon: 'i-lucide-circle',
  //           link: '/components/toast',
  //         },
  //         {
  //           title: 'Toggle',
  //           icon: 'i-lucide-circle',
  //           link: '/components/toggle',
  //         },
  //         {
  //           title: 'Toggle Group',
  //           icon: 'i-lucide-circle',
  //           link: '/components/toggle-group',
  //         },
  //         {
  //           title: 'Tooltip',
  //           icon: 'i-lucide-circle',
  //           link: '/components/tooltip',
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const navMenuBottom: NavMenuItems = [
  {
    title: 'Help & Support',
    icon: 'i-lucide-circle-help',
    link: 'https://example.com',
  },
  {
    title: 'Feedback',
    icon: 'i-lucide-send',
    link: 'https://example.com',
  },
];
