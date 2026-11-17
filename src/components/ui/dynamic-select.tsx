import * as React from "react"
import ReactSelect, {
  type ClassNamesConfig,
  type GroupBase,
  type Props as ReactSelectProps,
  type StylesConfig,
} from "react-select"
import AsyncSelect from "react-select/async"
import CreatableSelect from "react-select/creatable"
import { cn } from "@/lib/utils"

export type SelectOption = { value: string; label: string; disabled?: boolean }

/** Malam styling for react-select (unstyled mode + Tailwind tokens, works in light and dark). */
function classNamesFor<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(): ClassNamesConfig<Option, IsMulti, Group> {
  return {
    control: ({ isFocused, isDisabled }) =>
      cn(
        "min-h-8 w-full rounded-sm border border-(--input-border) bg-surface px-1.5 text-sm text-heading shadow-[inset_0_1px_2px_var(--inset-shadow)] transition-colors",
        isFocused && "border-ring ring-2 ring-ring/50",
        isDisabled && "pointer-events-none opacity-50"
      ),
    valueContainer: () => "gap-1 py-0.5",
    placeholder: () => "text-(--input-placeholder)",
    input: () => "text-heading [&_input]:!text-heading",
    singleValue: () => "text-heading",
    indicatorsContainer: () => "gap-0.5",
    clearIndicator: () => "rounded-xs p-1 text-muted-foreground hover:bg-accent hover:text-heading",
    dropdownIndicator: () => "rounded-xs p-1 text-muted-foreground hover:text-heading",
    indicatorSeparator: () => "hidden",
    loadingIndicator: () => "p-1 text-muted-foreground",
    menu: () => "mt-1 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg",
    menuList: () => "p-1",
    option: ({ isFocused, isSelected, isDisabled }) =>
      cn(
        "cursor-pointer rounded-xs px-2 py-1.5 text-sm",
        isFocused && "bg-accent text-accent-foreground",
        isSelected && "font-medium text-link",
        isDisabled && "cursor-not-allowed opacity-50"
      ),
    groupHeading: () => "px-2 py-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase",
    noOptionsMessage: () => "p-3 text-sm text-muted-foreground",
    loadingMessage: () => "p-3 text-sm text-muted-foreground",
    multiValue: () => "gap-1 rounded-xs bg-secondary pl-1.5 text-secondary-foreground",
    multiValueLabel: () => "py-0.5 text-xs",
    multiValueRemove: () => "rounded-xs px-1 hover:bg-destructive/30 hover:text-(--destructive-text)",
  }
}

function stylesFor<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(): StylesConfig<Option, IsMulti, Group> {
  return {
    // Render the menu in <body> so it is not clipped by dialogs, cards or scroll areas.
    menuPortal: (base) => ({ ...base, zIndex: 80 }),
  }
}

type Common<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = ReactSelectProps<Option, IsMulti, Group>

function usePortal() {
  const [target, setTarget] = React.useState<HTMLElement | null>(null)
  React.useEffect(() => setTarget(document.body), [])
  return target
}

/**
 * Searchable single or multi select (react-select) styled with Malam tokens.
 * Pass `isMulti` for chips, `isClearable`, `isSearchable`, `options`, groups, etc.
 */
function DynamicSelect<Option = SelectOption, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: Common<Option, IsMulti, Group>
) {
  const portal = usePortal()
  return (
    <ReactSelect<Option, IsMulti, Group>
      unstyled
      menuPortalTarget={portal}
      classNames={classNamesFor<Option, IsMulti, Group>()}
      styles={stylesFor<Option, IsMulti, Group>()}
      {...props}
    />
  )
}

/** Loads options from an API as the user types. Provide `loadOptions(input) => Promise<Option[]>`. */
function AsyncDynamicSelect<Option = SelectOption, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: React.ComponentProps<typeof AsyncSelect<Option, IsMulti, Group>>
) {
  const portal = usePortal()
  return (
    <AsyncSelect<Option, IsMulti, Group>
      unstyled
      menuPortalTarget={portal}
      classNames={classNamesFor<Option, IsMulti, Group>()}
      styles={stylesFor<Option, IsMulti, Group>()}
      {...props}
    />
  )
}

/** Lets users create new options by typing. Handle `onCreateOption` to persist them. */
function CreatableDynamicSelect<Option = SelectOption, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: React.ComponentProps<typeof CreatableSelect<Option, IsMulti, Group>>
) {
  const portal = usePortal()
  return (
    <CreatableSelect<Option, IsMulti, Group>
      unstyled
      menuPortalTarget={portal}
      classNames={classNamesFor<Option, IsMulti, Group>()}
      styles={stylesFor<Option, IsMulti, Group>()}
      {...props}
    />
  )
}

export { DynamicSelect, AsyncDynamicSelect, CreatableDynamicSelect }
