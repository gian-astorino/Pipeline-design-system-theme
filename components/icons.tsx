import { HugeiconsIcon } from "@hugeicons/react"
import type { HugeiconsProps } from "@hugeicons/react"
import {
  Alert01Icon,
  AlertCircleIcon,
  AppWindowIcon,
  Archive01Icon,
  ArrowDown01Icon,
  ArrowHorizontalIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  ArrowVerticalIcon,
  BankIcon,
  BellIcon,
  BluetoothIcon,
  Bookmark01Icon,
  CalculatorIcon,
  Calendar03Icon,
  CancelCircleIcon,
  ChartColumnIcon,
  ChartLineIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleArrowLeft01Icon,
  CircleCheckIcon,
  CircleDashedIcon,
  CirclePlusIcon,
  ClipboardIcon,
  Clock01Icon,
  CodeIcon,
  Copy01Icon,
  CreditCardIcon,
  Download01Icon,
  ExternalLinkIcon,
  EyeOffIcon,
  File01Icon,
  FileCodeIcon,
  FileSearchIcon,
  FileTextIcon,
  FileXIcon,
  FileZipIcon,
  FloppyDiskIcon,
  Folder01Icon,
  FolderPlusIcon,
  GitBranchIcon,
  GlobeIcon,
  Grid02Icon,
  HeartIcon,
  House01Icon,
  Image01Icon,
  InboxIcon,
  InfoIcon,
  Layout01Icon,
  Link01Icon,
  ListIcon,
  Loading03Icon,
  LogOutIcon,
  Mail01Icon,
  Message01Icon,
  Mic01Icon,
  MinusIcon,
  Moon01Icon,
  MoreHorizontalCircle02Icon,
  MoreHorizontalIcon,
  PencilIcon,
  PieChart01Icon,
  PlusIcon,
  Presentation01Icon,
  Pulse01Icon,
  QuestionIcon,
  RecordIcon,
  RefreshCwIcon,
  ScissorsIcon,
  Search01Icon,
  SearchAddIcon,
  SearchMinusIcon,
  Settings01Icon,
  Settings02Icon,
  Share01Icon,
  SidebarLeftIcon,
  SmileIcon,
  SparkleIcon,
  StarIcon,
  Sun01Icon,
  TableIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TrashIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  TypeIcon,
  UnfoldMoreIcon,
  User02Icon,
  UserCircleIcon,
  UserGroupIcon,
  UserMinus01Icon,
  VolumeOffIcon,
  Wallet01Icon,
  XIcon,
} from "@hugeicons/core-free-icons"

type IconProps = Omit<HugeiconsProps, "icon" | "strokeWidth"> & {
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
  strokeWidth?: number | string
}

/**
 * Icon compatibility layer: every component here keeps the exact name
 * and call-site shape (<IconName weight="bold" className="..." />) that
 * @phosphor-icons/react used, so consuming files didn't need to change
 * beyond their import source. Icons render via Hugeicons' free
 * Stroke Rounded set (the only style available without a Pro license) -
 * weight="bold" is approximated with a thicker stroke, since the free
 * tier has no separate bold/fill glyphs to swap to.
 */
function strokeWidthFor(weight?: IconProps["weight"]) {
  return weight === "bold" ? 2.5 : 1.5
}

function resolveStrokeWidth(
  strokeWidth: IconProps["strokeWidth"],
  weight?: IconProps["weight"]
) {
  if (strokeWidth === undefined) return strokeWidthFor(weight)
  return typeof strokeWidth === "string" ? Number(strokeWidth) : strokeWidth
}

function AppWindow({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={AppWindowIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Archive({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Archive01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowCircleLeft({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={CircleArrowLeft01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowClockwise({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={RefreshCwIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowDown({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ArrowDown01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowLeft({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ArrowLeft01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowRight({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ArrowRight01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowSquareOut({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ExternalLinkIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowUp({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ArrowUp01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowUpRight({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ArrowUpRight01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowsHorizontal({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ArrowHorizontalIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ArrowsVertical({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ArrowVerticalIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Bank({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={BankIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Bell({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={BellIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Bluetooth({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={BluetoothIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Bookmark({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Bookmark01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Calculator({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={CalculatorIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function CalendarBlank({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Calendar03Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function CaretDown({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ChevronDownIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function CaretLeft({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ChevronLeftIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function CaretRight({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ChevronRightIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function CaretUp({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ChevronUpIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function CaretUpDown({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={UnfoldMoreIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ChartBar({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ChartColumnIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ChartLine({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ChartLineIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ChartPie({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={PieChart01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ChatCircle({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Message01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Check({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={CheckIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function CheckCircle({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={CircleCheckIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function CircleDashed({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={CircleDashedIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Clipboard({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ClipboardIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Clock({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Clock01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Code({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={CodeIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Copy({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Copy01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function CreditCard({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={CreditCardIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function DotsThree({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={MoreHorizontalIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function DotsThreeOutline({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={MoreHorizontalCircle02Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Download({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Download01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Envelope({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Mail01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function EyeSlash({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={EyeOffIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function File({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={File01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function FileCode({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={FileCodeIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function FileMagnifyingGlass({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={FileSearchIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function FileText({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={FileTextIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function FileX({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={FileXIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function FileZip({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={FileZipIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function FloppyDisk({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={FloppyDiskIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Folder({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Folder01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function FolderPlus({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={FolderPlusIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Gear({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Settings02Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function GearSix({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Settings01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function GitBranch({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={GitBranchIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Globe({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={GlobeIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function GridFour({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Grid02Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Heart({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={HeartIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function House({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={House01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Image({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Image01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Info({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={InfoIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Layout({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Layout01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Link({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Link01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function List({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ListIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function MagnifyingGlass({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Search01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function MagnifyingGlassMinus({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={SearchMinusIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function MagnifyingGlassPlus({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={SearchAddIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Microphone({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Mic01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Minus({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={MinusIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Moon({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Moon01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Pencil({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={PencilIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Plus({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={PlusIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function PlusCircle({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={CirclePlusIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Presentation({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Presentation01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Pulse({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Pulse01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Question({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={QuestionIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Record({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={RecordIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Scissors({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ScissorsIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Share({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Share01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Sidebar({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={SidebarLeftIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function SignOut({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={LogOutIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Smiley({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={SmileIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Sparkle({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={SparkleIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function SpeakerSlash({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={VolumeOffIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Spinner({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Star({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={StarIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Sun({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Sun01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Table({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={TableIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function TextB({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={TextBoldIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function TextItalic({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={TextItalicIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function TextT({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={TypeIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function TextUnderline({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={TextUnderlineIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ThumbsDown({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ThumbsDownIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function ThumbsUp({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={ThumbsUpIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Trash({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={TrashIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Tray({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={InboxIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function TrendDown({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={TrendingDownIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function TrendUp({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={TrendingUpIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function User({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={User02Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function UserCircle({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={UserCircleIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function UserMinus({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={UserMinus01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Users({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={UserGroupIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Wallet({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Wallet01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function Warning({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={Alert01Icon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function WarningCircle({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={AlertCircleIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function X({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={XIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

function XCircle({ weight, strokeWidth, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={CancelCircleIcon}
      strokeWidth={resolveStrokeWidth(strokeWidth, weight)}
      {...props}
    />
  )
}

export {
  AppWindow,
  Archive,
  ArrowCircleLeft,
  ArrowClockwise,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  ArrowUp,
  ArrowUpRight,
  ArrowsHorizontal,
  ArrowsVertical,
  Bank,
  Bell,
  Bluetooth,
  Bookmark,
  Calculator,
  CalendarBlank,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  CaretUpDown,
  ChartBar,
  ChartLine,
  ChartPie,
  ChatCircle,
  Check,
  CheckCircle,
  CircleDashed,
  Clipboard,
  Clock,
  Code,
  Copy,
  CreditCard,
  DotsThree,
  DotsThreeOutline,
  Download,
  Envelope,
  EyeSlash,
  File,
  FileCode,
  FileMagnifyingGlass,
  FileText,
  FileX,
  FileZip,
  FloppyDisk,
  Folder,
  FolderPlus,
  Gear,
  GearSix,
  GitBranch,
  Globe,
  GridFour,
  Heart,
  House,
  Image,
  Info,
  Layout,
  Link,
  List,
  MagnifyingGlass,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Microphone,
  Minus,
  Moon,
  Pencil,
  Plus,
  PlusCircle,
  Presentation,
  Pulse,
  Question,
  Record,
  Scissors,
  Share,
  Sidebar,
  SignOut,
  Smiley,
  Sparkle,
  SpeakerSlash,
  Spinner,
  Star,
  Sun,
  Table,
  TextB,
  TextItalic,
  TextT,
  TextUnderline,
  ThumbsDown,
  ThumbsUp,
  Trash,
  Tray,
  TrendDown,
  TrendUp,
  User,
  UserCircle,
  UserMinus,
  Users,
  Wallet,
  Warning,
  WarningCircle,
  X,
  XCircle,
}
