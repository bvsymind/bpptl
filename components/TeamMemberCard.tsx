import Image from "next/image";
import { TeamMember } from "./TeamMemberModal";

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void;
}

const TeamMemberCard = ({ member, onClick }: TeamMemberCardProps) => {
  return (
  <div
    onClick={onClick}
    className="border border-border hover:border-foreground transition-all cursor-pointer group rounded-md relative overflow-hidden w-full" 
  >
      <div className="relative aspect-3/4 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 767px) 33vw, (max-width: 1023px) 25vw, 20vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300 rounded-md"
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 hover:opacity-0"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
          <h3 className="font-bold text-lg leading-tight">{member.name}</h3>
          <p className="text-sm opacity-90">{member.role} of {member.division}</p>
        </div>
        {/* --- END PERUBAHAN UTAMA --- */}

      </div>
    </div>
  );
};

export default TeamMemberCard;
