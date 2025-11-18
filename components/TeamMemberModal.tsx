// import Image from "next/image";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// export interface TeamMember {
//   id: string;
//   name: string;
//   role: string;
//   division?: string;
//   nim?: number;
//   image: string;
//   description?: string;
//   email?: string;
// }

// interface TeamMemberModalProps {
//   member: TeamMember | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const TeamMemberModal = ({ member, open, onOpenChange }: TeamMemberModalProps) => {
//   if (!member) return null;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="text-2xl">{member.name}</DialogTitle>
//         </DialogHeader>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
//           <div className="relative aspect-3/4 border border-border">
//             <Image
//               src={member.image}
//               alt={member.name}
//               fill
//               sizes="(max-width: 639px) 90vw, 244px"
//               className="object-cover"
//             />
//           </div>

//           <div className="space-y-2">
//             <p className="font-semibold">{member.role}</p>

//             {member.division && (
//               <p className="text-sm text-muted-foreground">
//                 <span className="font-semibold">Division:</span> {member.division}
//               </p>
//             )}

//             {member.nim && (
//               <p className="text-sm text-muted-foreground">
//                 <span className="font-semibold">NIM:</span> {member.nim}
//               </p>
//             )}

//             {member.email && (
//               <p className="text-sm">
//                 <a href={`mailto:${member.email}`} className="hover:underline">
//                   {member.email}
//                 </a>
//               </p>
//             )}

//             {member.description && (
//               <p className="text-sm text-muted-foreground mt-4">
//                 <span className="font-semibold">Expertise:</span> {member.description}
//               </p>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default TeamMemberModal;


import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  division?: string;
  nim?: number;
  image: string;
  description?: string;
  email?: string;
}

interface TeamMemberModalProps {
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TeamMemberModal = ({ member, open, onOpenChange }: TeamMemberModalProps) => {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">{member.name}</DialogTitle>
        </DialogHeader>

        {/* [PERUBAHAN 1] 
          Mengganti 'grid' dengan 'flex'.
          - flex-col: Default di mobile (tumpuk ke bawah)
          - sm:flex-row: Menjadi 2 kolom di layar 'sm' ke atas
        */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          
          {/* [PERUBAHAN 2] Menambahkan class lebar */}
          <div className="relative aspect-3/4 border border-border w-full sm:w-1/2">
            <Image
              src={member.image}
              alt={member.name}
              fill
              // [PERUBAHAN 3] Update 'sizes' agar sesuai layout baru
              sizes="(max-width: 639px) 90vw, 220px"
              className="object-cover"
            />
          </div>

          {/* [PERUBAHAN 4] Menambahkan class lebar */}
          <div className="space-y-2 w-full sm:w-1/2">
            <p className="font-semibold">{member.role}</p>

            {member.division && (
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Division:</span> {member.division}
              </p>
            )}

            {member.nim && (
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">NIM:</span> {member.nim}
              </p>
            )}

            {member.email && (
              <p className="text-sm">
                <a href={`mailto:${member.email}`} className="hover:underline">
                  {member.email}
                </a>
              </p>
            )}

            {member.description && (
              <p className="text-sm text-muted-foreground mt-4">
                <span className="font-semibold">Expertise:</span> {member.description}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberModal;