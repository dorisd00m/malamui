import type * as React from "react"
import * as EF from "./examples-forms"
import * as EO from "./examples-overlay"
import * as ED from "./examples-display"
import * as ER from "./examples-radio"
import * as EI from "./examples-icon"
import * as EC from "./examples-chat"
import * as ES from "./examples-sidebar"
import * as EM from "./examples-more"
import * as EX from "./examples-final"

export type ExampleDef = { title: string; description?: string; demo: React.ComponentType }

/** Every example function by name, so the Code tab can find its own source. */
export const exampleNames = new Map<React.ComponentType, string>(
  Object.entries({ ...EF, ...EO, ...ED, ...ER, ...EI, ...EC, ...ES, ...EM, ...EX }).map(([k, v]) => [v as React.ComponentType, k])
)

/**
 * Extra examples per component id (the main preview comes from the gallery entry).
 * Each demo is a real function in examples-*.tsx; its source is shown in the Code tab.
 */
export const examples: Record<string, ExampleDef[]> = {
  button: [
    { title: "Sizes", demo: EF.ButtonSizesExample },
    { title: "With icon", demo: EF.ButtonIconsExample },
    { title: "Icon only", description: "Icon buttons need an aria-label.", demo: EF.ButtonIconOnlyExample },
    { title: "Loading", description: "Disable the button and show a Spinner while work is in progress.", demo: EF.ButtonLoadingExample },
    { title: "As a link", description: "Use the render prop to keep link semantics.", demo: EF.ButtonAsLinkExample },
  ],
  "button-group": [{ title: "Segmented and vertical", demo: EF.ButtonGroupSplitExample }],
  toggle: [
    { title: "Outline", demo: EF.ToggleOutlineExample },
    { title: "With text", demo: EM.ToggleWithTextExample },
    { title: "Sizes", demo: EM.ToggleSizesExample },
    { title: "Controlled", demo: EM.ToggleControlledExample },
    { title: "Disabled", demo: EM.ToggleDisabledExample },
  ],
  "toggle-group": [
    { title: "Single and multiple", demo: EF.ToggleGroupMultipleExample },
    { title: "Outline", demo: EM.ToggleGroupOutlineExample },
    { title: "Sizes", demo: EM.ToggleGroupSizesExample },
    { title: "Spacing", demo: EM.ToggleGroupSpacedExample },
    { title: "Vertical", demo: EM.ToggleGroupVerticalExample },
    { title: "Controlled with a disabled item", demo: EM.ToggleGroupDisabledExample },
  ],
  input: [
    { title: "With label", demo: EF.InputWithLabelExample },
    { title: "With button", demo: EF.InputWithButtonExample },
    { title: "File", demo: EF.InputFileExample },
    { title: "States", description: "Disabled, invalid, read-only and password.", demo: EF.InputStatesExample },
  ],
  "input-group": [
    { title: "Icons and text", demo: EF.InputGroupIconExample },
    { title: "Buttons and textarea", demo: EF.InputGroupButtonExample },
  ],
  textarea: [
    { title: "With label", demo: EF.TextareaWithLabelExample },
    { title: "With button", demo: EF.TextareaWithButtonExample },
    { title: "Character counter", demo: EF.TextareaCounterExample },
  ],
  field: [{ title: "Fieldsets with radios and checkboxes", demo: EF.FieldFieldsetsExample }],
  checkbox: [
    { title: "With description", demo: EF.CheckboxWithDescriptionExample },
    { title: "Select all (indeterminate)", demo: EF.CheckboxSelectAllExample },
    { title: "Card style", demo: EF.CheckboxCardExample },
  ],
  "radio-group": [
    { title: "With descriptions", description: "Pair each item with a label and helper text using Field.", demo: ER.RadioDescriptionExample },
    { title: "Choice card", description: "Wrap Field in FieldLabel so the whole card is the click target.", demo: ER.RadioChoiceCardExample },
    { title: "Fieldset", description: "FieldSet and FieldLegend name the group for screen readers.", demo: ER.RadioFieldsetExample },
    { title: "Cards", demo: EF.RadioCardsExample },
    { title: "Plan picker", demo: ER.RadioPlanExample },
    { title: "With icons", description: "Icons from Iconify; the radio itself is visually hidden but still keyboard accessible.", demo: ER.RadioIconCardsExample },
    { title: "Horizontal", demo: EF.RadioHorizontalExample },
    { title: "Disabled", description: "Disable a single item, or the whole group.", demo: ER.RadioDisabledExample },
    { title: "Invalid", description: "Set data-invalid on Field and aria-invalid on each item, then show a FieldError.", demo: ER.RadioInvalidExample },
    { title: "Controlled", demo: ER.RadioControlledExample },
  ],
  icon: [
    { title: "Sizes, colors and transforms", demo: EI.IconSizesColorsExample },
    { title: "Inside buttons, inputs and tabs", description: "Icons inherit currentColor, so they follow the component's text color.", demo: EI.IconInUiExample },
    { title: "Icon sets", demo: EI.IconSetsExample },
    { title: "Animated icons", demo: EI.IconAnimatedExample },
    { title: "Search all icons", description: "Queries the public Iconify API. Click an icon to copy its JSX.", demo: EI.IconSearchExample },
    { title: "Offline icons", description: "Register icons or whole sets once so no network request is needed.", demo: EI.IconOfflineExample },
  ],
  switch: [
    { title: "With description", description: "Field gives a label, helper text and the switch a consistent layout.", demo: EM.SwitchDescriptionExample },
    { title: "Choice card", description: "FieldLabel wraps the whole card so it is one click target.", demo: EM.SwitchChoiceCardExample },
    { title: "Settings list", demo: EF.SwitchSettingsExample },
    { title: "In a card form", demo: EM.SwitchCardFormExample },
    { title: "Controlled", demo: EM.SwitchControlledExample },
    { title: "With icons", demo: EM.SwitchThemeExample },
    { title: "Invalid", demo: EM.SwitchInvalidExample },
    { title: "Sizes and states", demo: EF.SwitchStatesExample },
  ],
  slider: [
    { title: "Range", demo: EF.SliderRangeExample },
    { title: "Steps", demo: EF.SliderStepsExample },
    { title: "Vertical", demo: EF.SliderVerticalExample },
  ],
  select: [
    { title: "Scrollable list", demo: EF.SelectScrollableExample },
    { title: "In a Field", description: "Pass items so the trigger shows the label, not the value.", demo: EF.SelectFieldExample },
    { title: "Small and disabled", demo: EF.SelectSizesExample },
  ],
  "native-select": [{ title: "Groups and disabled", demo: EF.NativeSelectGroupsExample }],
  "input-otp": [
    { title: "Four digits with a pattern", demo: EF.OTPFourDigitsExample },
    { title: "Controlled", demo: EF.OTPControlledExample },
  ],
  calendar: [
    { title: "Range", demo: EF.CalendarRangeExample },
    { title: "Multiple days", demo: EF.CalendarMultipleExample },
    { title: "Month and year dropdowns", demo: EF.CalendarDropdownExample },
    { title: "Disabled days", description: "Past dates and weekends are not selectable.", demo: EF.CalendarDisabledExample },
  ],
  "date-picker": [
    { title: "In a Field", demo: EF.DatePickerFieldExample },
    { title: "Date of birth", description: "Dropdown captions make distant years easy to reach.", demo: EF.DatePickerBirthdayExample },
    { title: "Clearable", demo: EF.DatePickerClearableExample },
    { title: "Locales and formats", demo: EF.DatePickerLocaleExample },
  ],
  "date-range-picker": [
    { title: "Single month", demo: EF.DateRangeSingleMonthExample },
    { title: "Limited window", description: "Only the next 60 days can be chosen.", demo: EF.DateRangeLimitedExample },
  ],
  rating: [
    { title: "Half stars", demo: EF.RatingHalfExample },
    { title: "Read only with counts", demo: EF.RatingReadOnlyExample },
    { title: "Sizes and custom max", demo: EF.RatingSizesExample },
    { title: "In a review form", demo: EF.RatingFormExample },
  ],
  dialog: [
    { title: "Custom close button", demo: O("DialogCustomClose") },
    { title: "No close button", description: "Set showCloseButton={false} and give users explicit choices.", demo: O("DialogNoCloseButton") },
    { title: "Scrollable content", demo: O("DialogScrollable") },
    { title: "Form", demo: O("DialogForm") },
    { title: "Sticky header and footer", demo: O("DialogStickyFooter") },
  ],
  "alert-dialog": [{ title: "With an icon", demo: O("AlertDialogMedia") }],
  sheet: [
    { title: "Sides", demo: O("SheetSides") },
    { title: "Form", demo: O("SheetForm") },
  ],
  drawer: [{ title: "Goal picker", demo: O("DrawerGoal") }],
  popover: [
    { title: "Form", demo: O("PopoverForm") },
    { title: "Placement", demo: O("PopoverSides") },
  ],
  tooltip: [
    { title: "Sides", demo: O("TooltipSides") },
    { title: "Shortcuts and disabled buttons", demo: O("TooltipShortcut") },
  ],
  "hover-card": [
    { title: "Profile", demo: O("HoverCardProfile") },
    { title: "Link preview", description: "Rich content with an image inside a paragraph.", demo: EX.HoverCardLinkPreviewExample },
    { title: "User mention", demo: EX.HoverCardUserExample },
    { title: "Sides", demo: EX.HoverCardSidesExample },
    { title: "Delay", description: "Control the open and close delays on the trigger.", demo: EX.HoverCardDelayExample },
  ],
  combobox: [
    { title: "Multiple with chips", demo: EX.ComboboxMultipleExample },
    { title: "Clear button", demo: EX.ComboboxClearExample },
    { title: "Groups", demo: EX.ComboboxGroupsExample },
    { title: "Popup (select style)", description: "A button trigger with the search field inside the popup.", demo: EX.ComboboxPopupExample },
    { title: "In a Field with validation", demo: EX.ComboboxFieldExample },
  ],
  "navigation-menu": [
    { title: "Rich content", demo: EX.NavigationMenuRichExample },
    { title: "Links with an active state", demo: EX.NavigationMenuLinksExample },
    { title: "With icons", demo: EX.NavigationMenuIconsExample },
  ],
  kbd: [
    { title: "Shortcuts", demo: EX.KbdGroupExample },
    { title: "In buttons", demo: EX.KbdInButtonExample },
    { title: "In a tooltip", demo: EX.KbdTooltipExample },
    { title: "Shortcut list", demo: EX.KbdShortcutListExample },
  ],
  label: [
    { title: "With a checkbox", demo: EX.LabelCheckboxExample },
    { title: "Required field", demo: EX.LabelRequiredExample },
    { title: "With an icon", demo: EX.LabelWithIconExample },
    { title: "Disabled", demo: EX.LabelDisabledExample },
  ],
  "aspect-ratio": [
    { title: "Common ratios", demo: EX.AspectRatioRatiosExample },
    { title: "Portrait", demo: EX.AspectRatioPortraitExample },
    { title: "Video placeholder", demo: EX.AspectRatioVideoExample },
  ],
  "code-block": [
    { title: "Header with copy button", demo: EX.CodeBlockHeaderExample },
    { title: "Syntax highlighting", description: "Uses the useHighlightedCode hook (Shiki). Install it with @malam/use-highlighted-code.", demo: EX.CodeBlockHighlightedExample },
    { title: "Line numbers", demo: EX.CodeBlockLineNumbersExample },
    { title: "Diff lines", description: "CodeBlockLine variants mark added, removed and highlighted lines.", demo: EX.CodeBlockDiffExample },
    { title: "Wrapping with a footer", demo: EX.CodeBlockFooterExample },
  ],
  toast: [{ title: "Actions and durations", demo: O("ToastAction") }],
  "dropdown-menu": [
    { title: "Checkboxes", demo: O("DropdownCheckboxes") },
    { title: "Radio group", demo: O("DropdownRadio") },
    { title: "Submenu and shortcuts", demo: O("DropdownSubmenu") },
  ],
  "context-menu": [{ title: "Submenu, checkbox and radio", demo: O("ContextMenuFull") }],
  menubar: [{ title: "Checkbox and radio items", demo: O("MenubarCheckRadio") }],
  command: [{ title: "Command dialog (Ctrl+K)", demo: O("CommandDialog") }],
  breadcrumb: [
    { title: "Collapsed with a dropdown", demo: O("BreadcrumbEllipsis") },
    { title: "Custom separator", demo: O("BreadcrumbSeparator") },
  ],
  pagination: [{ title: "Controlled", demo: O("PaginationControlled") }],
  typography: [
    { title: "Headings", demo: ED.TypographyHeadingsExample },
    { title: "Text styles", demo: ED.TypographyTextExample },
    { title: "Blockquote and lists", demo: ED.TypographyBlockquoteListExample },
    { title: "Inline code and keys", demo: ED.TypographyInlineExample },
    { title: "Prose for raw HTML", description: "Style Markdown or CMS output without touching its markup.", demo: ED.TypographyProseExample },
  ],
  tabs: [
    { title: "Line", demo: ED.TabsLineExample },
    { title: "With icons", demo: ED.TabsIconsExample },
    { title: "Vertical", demo: ED.TabsVerticalExample },
    { title: "Inside cards", demo: ED.TabsCardsExample },
  ],
  card: [
    { title: "Form", demo: ED.CardFormExample },
    { title: "With an action", demo: ED.CardActionExample },
    { title: "With media", demo: ED.CardMediaExample },
  ],
  badge: [
    { title: "With icons", demo: ED.BadgeIconsExample },
    { title: "Counts", demo: ED.BadgeCountExample },
    { title: "As links", demo: ED.BadgeLinkExample },
  ],
  avatar: [
    { title: "Sizes", demo: ED.AvatarSizesExample },
    { title: "Status badge", demo: ED.AvatarBadgeExample },
    { title: "Group with count", demo: ED.AvatarGroupCountExample },
  ],
  alert: [{ title: "Action and no icon", demo: ED.AlertActionExample }],
  accordion: [
    { title: "Multiple open", demo: ED.AccordionMultipleExample },
    { title: "Controlled", demo: ED.AccordionControlledExample },
  ],
  collapsible: [{ title: "Expandable list", demo: ED.CollapsibleListExample }],
  table: [
    { title: "With footer total", demo: ED.TableFooterExample },
    { title: "Row actions", demo: EM.TableActionsExample },
    { title: "Selectable rows", demo: ED.TableSelectableExample },
    { title: "Sortable columns", demo: EM.TableSortableExample },
    { title: "Search and pagination", demo: EM.TableSearchPaginationExample },
    { title: "Sticky header", demo: EM.TableStickyHeaderExample },
    { title: "Users with avatars", demo: EM.TableUsersExample },
  ],
  progress: [
    { title: "Label and value", demo: ED.ProgressLabelExample },
    { title: "Animated", demo: ED.ProgressAnimatedExample },
  ],
  skeleton: [
    { title: "Card", demo: ED.SkeletonCardExample },
    { title: "List", demo: ED.SkeletonListExample },
  ],
  spinner: [{ title: "Sizes and inline", demo: ED.SpinnerSizesExample }],
  "scroll-area": [
    { title: "Vertical list", demo: EM.ScrollAreaTagsExample },
    { title: "Horizontal", demo: ED.ScrollAreaHorizontalExample },
    { title: "Horizontal gallery", demo: EM.ScrollAreaGalleryExample },
    { title: "Both directions", demo: EM.ScrollAreaBothExample },
    { title: "Scrollable tabs", demo: EM.ScrollAreaTabsExample },
  ],
  separator: [{ title: "In a layout", demo: ED.SeparatorInlineExample }],
  carousel: [
    { title: "Several slides at once", demo: ED.CarouselMultipleExample },
    { title: "Vertical", demo: ED.CarouselVerticalExample },
    { title: "Dots", demo: ED.CarouselDotsExample },
  ],
  resizable: [
    { title: "Vertical", demo: ED.ResizableVerticalExample },
    { title: "Nested", demo: ED.ResizableNestedExample },
  ],
  message: [
    { title: "Grouped messages", demo: EC.MessageGroupedExample },
    { title: "Reactions", demo: EC.MessageReactionsExample },
    { title: "Attachments", demo: EC.MessageAttachmentsExample },
    { title: "Typing indicator", demo: EC.MessageTypingExample },
    { title: "Error and retry", demo: EC.MessageErrorExample },
    { title: "AI response", description: "A ghost bubble drops the background for long-form answers.", demo: EC.MessageAiResponseExample },
  ],
  bubble: [
    { title: "Suggestions", description: "BubbleContent can render as a button for quick replies.", demo: EC.BubbleSuggestionsExample },
    { title: "Reactions", demo: EC.MessageReactionsExample },
  ],
  "message-scroller": [
    { title: "Jump controls", description: "useMessageScroller exposes scrollToStart, scrollToEnd and scrollToMessage.", demo: EC.MessageScrollerJumpExample },
    { title: "Loading earlier messages", description: "preserveScrollOnPrepend keeps the reading position when history is added above.", demo: EC.MessageScrollerPrependExample },
  ],
  attachment: [
    { title: "States", demo: EC.AttachmentStatesExample },
    { title: "With actions", demo: EC.AttachmentActionsExample },
    { title: "Sizes", demo: EC.AttachmentSizesExample },
    { title: "Vertical thumbnails", demo: EC.AttachmentVerticalExample },
  ],
  marker: [{ title: "Between messages", demo: EC.MarkerInChatExample }],
  trace: [
    { title: "Collapsible details", demo: EC.TraceCollapsibleExample },
    { title: "Statuses", demo: EC.TraceStatusExample },
  ],
  questionnaire: [{ title: "Required question", demo: EC.QuestionnaireRequiredExample }],
  sidebar: [
    { title: "Collapse to icons", demo: ES.SidebarCollapsibleIconExample },
    { title: "Nested menus", demo: ES.SidebarSubmenuExample },
    { title: "Search and groups", demo: ES.SidebarSearchGroupsExample },
    { title: "Floating and inset", demo: ES.SidebarVariantsExample },
    { title: "Right side", demo: ES.SidebarRightExample },
    { title: "Loading skeleton", demo: ES.SidebarLoadingExample },
  ],
  empty: [{ title: "With actions", demo: ED.EmptyActionExample }],
  item: [{ title: "List with actions", demo: ED.ItemVariantsExample }],
}

/** Looks up an overlay example by its name without the "Example" suffix. */
function O(name: string): React.ComponentType {
  return (EO as Record<string, React.ComponentType>)[`${name}Example`]
}
