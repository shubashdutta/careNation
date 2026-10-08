import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface UserNode {
  id: string
  name: string
  referralCount: number
  avatar: string
  children?: UserNode[]
}

// Sample tree data up to 2 layers deep
const initialData: UserNode = {
  id: "(BW706468)",
  name: "Sita Thapa",
  referralCount: 2,
  avatar:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  // Layer 1
  children: [
    {
      id: "(BW706469)",
      name: "Hari Sharma",
      referralCount: 2,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      // Layer 2
      children: [
        {
          id: "(BW706471)",
          name: "Rohan Rai",
          referralCount: 0,
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        },
        {
          id: "(BW706472)",
          name: "Pooja Gurung",
          referralCount: 0,
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "(BW706470)",
      name: "Gita Adhikari",
      referralCount: 2,
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      // Layer 2
      children: [
        {
          id: "(BW706473)",
          name: "Aarav Shrestha",
          referralCount: 0,
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        },
        {
          id: "(BW706474)",
          name: "Maya Karki",
          referralCount: 0,
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        },
      ],
    },
  ],
}

interface TreeNodeProps {
  node: UserNode
  level?: number
}

const TreeNode = ({ node, level = 0 }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Only allow expansion if children exist and depth level is under 2 (Layers 0 and 1 can expand)
  const canExpand = level < 2 && node.children && node.children.length > 0

  const toggleExpand = () => {
    if (canExpand) {
      setIsExpanded((prev) => !prev)
    }
  }

  return (
    <div className="relative flex items-center">
      {/* Current User Card */}
      <div
        onClick={canExpand ? toggleExpand : undefined}
        className={`relative z-10 flex items-center gap-3.5 rounded-xl border border-gray-200/80 bg-white p-3 pr-8 shadow-sm transition-shadow ${
          canExpand ? "cursor-pointer hover:shadow-md" : ""
        }`}
      >
        {/* Toggle Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation() // Prevent duplicate toggles
            toggleExpand()
          }}
          disabled={!canExpand}
          className={`flex h-5 w-5 items-center justify-center rounded-md text-white transition-colors ${
            canExpand
              ? "bg-[#5B3EA7] hover:bg-[#4a328a]"
              : "cursor-not-allowed bg-gray-300"
          }`}
        >
          {isExpanded ? (
            <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
          ) : (
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          )}
        </button>

        {/* User Avatar */}
        <img
          src={node.avatar}
          alt={node.name}
          className="h-12 w-12 rounded-xl object-cover"
        />

        {/* User Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-[#322A53]">
              {node.name}
            </span>
            <span className="text-xs font-normal text-gray-500">{node.id}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Referral Count :{" "}
            <span className="font-medium text-gray-600">
              {node.referralCount}
            </span>
          </p>
        </div>
      </div>

      {/* Children Container (Rendered to the RIGHT side) */}
      {isExpanded && canExpand && (
        <div className="relative flex items-center">
          {/* Connecting Line from Parent to Child Branch */}
          <div className="h-[2px] w-8 bg-gray-300" />

          {/* Vertical Branch Container */}
          <div className="relative flex flex-col justify-center gap-6 pl-0">
            {/* Left Vertical Trunk Line linking all children */}
            <div className="absolute top-6 bottom-6 left-0 w-[2px] bg-gray-300" />

            {node.children?.map((child) => (
              <div key={child.id} className="relative flex items-center pl-6">
                {/* Horizontal branch line connecting trunk to individual child */}
                <div className="absolute top-1/2 left-0 h-[2px] w-6 -translate-y-1/2 bg-gray-300" />

                {/* Child Component Node */}
                <TreeNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const MyStructureView = () => {
  return (
    <div className="flex items-center overflow-x-auto p-12">
      <TreeNode node={initialData} />
    </div>
  )
}

export default MyStructureView
