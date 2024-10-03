const { prismaClient, disconnect } = require("../daos/prismaClient");
const env = require("dotenv");
const path = require("path");
env.config({ path: path.resolve(__dirname, "../.env") });

async function main() {
  if (await prismaClient.usertype.count() > 0) {
    console.log("Static Data Already Exists");
  }
  else {
    await prismaClient.usertype.createMany({
      data: [
        { id: 1, name: 'Academic User' },
        { id: 2, name: 'Business User' },
        { id: 3, name: 'Administrator User' },
      ],
    });

    await prismaClient.institution.createMany({
      data: [
        { id: 1, name: 'University of Auckland', address: 'Auckland' },
        { id: 2, name: 'Massey University', address: 'Palmerston North' },
        { id: 3, name: 'University of Waikato', address: 'Hamilton' },
        { id: 4, name: 'University of Otago', address: 'Dunedin' },
        { id: 5, name: 'Victoria University of Wellington', address: 'Wellington' },
        { id: 6, name: 'University of Canterbury', address: 'Christchurch' },
        { id: 7, name: 'Lincoln University', address: 'Lincoln' },
        { id: 8, name: 'Auckland University of Technology', address: 'Auckland' },
      ],
    });

    await prismaClient.faculty.createMany({
      data: [
        { id: 1, name: 'Law School' },
        { id: 2, name: 'School of business management' },
      ],
    });

    await prismaClient.organization.createMany({
      data: [
        { name: "Jimenez's Inc.", address: "95 Mosley St" },
        { name: "Frances Food Inc.", address: "562 68 Qinghe Middle St, Haidian District" },
        { name: "Rogers Pharmaceutical Inc.", address: "877 Osney Mead" },
      ],
    });

    await prismaClient.user_profile.createMany({
      data: [
        { usertypeid: 3, first_name: 'Admin', last_name: 'Admin', title: 'Ms.', primary_email: process.env.DB_ADMIN_EMAIL, is_verified: true, signup_datetime: new Date('2006-02-26T10:13:02Z'), password: process.env.DB_ADMIN_PASSWORD_ENCRYPTED },
        { usertypeid: 2, first_name: 'Jonathan', last_name: 'Phillips', title: 'Ms.', primary_email: 'jonphillips626@hotmail.com', is_verified: true, signup_datetime: new Date('2006-02-26T10:13:02Z'), organization_id: 1 },
        { usertypeid: 2, first_name: 'Theresa', last_name: 'Wright', title: 'Ms.', primary_email: 'theresawrigh@icloud.com', is_verified: false, signup_datetime: new Date('2021-07-13T10:36:48Z'), organization_id: 1 },
        { usertypeid: 1, first_name: 'Tina', last_name: 'Spencer', title: 'Prof.', primary_email: 'spentina@gmail.com', signup_datetime: new Date('2012-10-07T15:44:00Z'), organization_id: 2 },
        { usertypeid: 1, first_name: 'Aaron', last_name: 'Hamilton', title: 'Prof.', primary_email: 'hamia@icloud.com', is_verified: false, signup_datetime: new Date('2002-07-08T17:21:16Z'), organization_id: 1 },
        { usertypeid: 2, first_name: 'Katherine', last_name: '', title: 'Mrs.', primary_email: 'okat3@icloud.com', is_verified: false, signup_datetime: new Date('2003-09-12T21:01:50Z'), organization_id: 2 },
        { usertypeid: 2, first_name: 'Theodore', last_name: '', title: 'Prof.', primary_email: 'sanderstheod6@outlook.com', is_verified: false, signup_datetime: new Date('2011-09-05T03:48:36Z'), organization_id: 1 },
        { usertypeid: 2, first_name: 'Valerie', last_name: 'Davis', title: 'Mrs.', primary_email: 'davisv1025@outlook.com', is_verified: false, signup_datetime: new Date('2007-07-30T04:15:53Z'), organization_id: 3 },
        { usertypeid: 2, first_name: 'Marie', last_name: 'Weaver', title: 'Miss.', primary_email: 'marweave@hotmail.com', is_verified: true, signup_datetime: new Date('2012-03-30T19:08:31Z'), organization_id: 1 },
        { usertypeid: 2, first_name: 'Nicholas', last_name: 'Cole', title: 'Miss.', primary_email: 'colenicholas@gmail.com', is_verified: false, signup_datetime: new Date('2009-10-13T09:05:44Z'), organization_id: 3 },
        { usertypeid: 2, first_name: 'Antoni', last_name: 'Lopez', title: 'Mr.', primary_email: 'antolopez4@gmail.com', is_verified: true, signup_datetime: new Date('2003-09-29T21:40:09Z'), organization_id: 1 },
      ],
    });

    //Some profiles from the EXCEL Sheet provided by the PO
  const userProfiles = [
    {
      usertypeid: 1,
      institution_id: 6,
      first_name: 'Natalie',
      last_name: 'Baird',
      title: 'Associate Professor',
      primary_email: 'natalie.baird12@canterbury.ac.nz',
      orcid_identifier: '0000-0045-3812-192X',
      department: 'Faculty of Law',
      positions: 'Associate Professor',
      bio: 'Natalie’s current research interests lie in the areas of refugee law, international human rights, Pacific legal studies and the scholarship of teaching and learning. In relation to refugee law, current projects include New Zealand\'s complementary protection jurisprudence since the enactment of the Immigration Act 2009, and New Zealand\'s under-developed system for responding to claims for protection from stateless people. In the human rights context, a major focus has been the impact of the UN\'s Universal Periodic Review mechanism, in both New Zealand and the Pacific Islands. In 2014, along with a group of enthusiastic students, Natalie coordinated a submission for New Zealand\'s second Universal Periodic Review at the UN Human Rights Council on the human rights impacts of the Canterbury earthquakes. Natalie is also a member of the Socio-Legal Studies Group in the Law School, which is currently engaged in a longitudinal study of the 2014 intake of New Zealand law students.',
      research_area: '',
      research_tags: '',
    },
    {
      usertypeid: 1,
      institution_id: 6,
      first_name: 'Paul',
      last_name: 'Ballantine',
      title: 'Professor',
      primary_email: 'paul.ballantine@canterbury.ac.nz',
      orcid_identifier: '0000-0001-8828-5116',
      department: 'UC Business School',
      positions: 'Executive Dean, Professor',
      bio: 'Research interests include retailing, consumption behaviour (particularly the negative aspects of consumption), and social and ethical issues in marketing.',
      research_area: '',
      research_tags: '',
    },
    {
      usertypeid: 1,
      institution_id: 6,
      first_name: 'Oscar',
      last_name: 'Bloom',
      title: 'Mr',
      primary_email: 'oscar.bloom@canterbury.ac.nz',
      orcid_identifier: null,
      department: 'Faculty of Law',
      positions: 'LawME Mentor',
      bio: '',
      research_area: '',
      research_tags: '',
    },
    {
      usertypeid: 1,
      institution_id: 6,
      first_name: 'Neil',
      last_name: 'Boister',
      title: 'Professor',
      primary_email: 'neil.boister@canterbury.ac.nz',
      orcid_identifier: '000-0002-7805-5824',
      department: 'Faculty of Law',
      positions: 'Professor',
      bio: 'My research interests lie in the intersection between the fields of criminal law and international law. My initial specialisation was in international drug control law, the topic of my PhD, and I retain an interest in the international drug control system, but I have since written extensively on international tobacco smuggling, the UN Convention against Transnational Organised Crime, and the law of extradition. I am particularly interested in the developing field of transnational criminal law, as that part of international criminal law in a general sense which is concerned with the suppression of transnational crime by states, and have published extensively on this topic. In addition, I have worked in the international criminal law in a strict sense, particularly on the law and history of the International Tribunal for the Far East.',
      research_area: '',
      research_tags: '',
    },
    {
      usertypeid: 1,
      institution_id: 6,
      first_name: 'Lindsay',
      last_name: 'Breach',
      title: 'Doctor',
      primary_email: 'lindsay.breach@canterbury.ac.nz',
      orcid_identifier: null,
      department: 'Faculty of Law',
      positions: 'Lecturer - Teaching and Admin',
      bio: '',
      research_area: '',
      research_tags: '',
    },
    {
      usertypeid: 1,
      institution_id: 6,
      first_name: 'Taryn',
      last_name: 'Breen',
      title: 'Miss',
      primary_email: 'taryn.breen@canterbury.ac.nz',
      orcid_identifier: null,
      department: 'Faculty of Law',
      positions: 'LawME Mentor',
      bio: '',
      research_area: '',
      research_tags: '',
    },
    {
      usertypeid: 1,
      institution_id: 6,
      first_name: 'Richard',
      last_name: 'Burchill',
      title: 'Doctor',
      primary_email: 'richard.burchill@canterbury.ac.nz',
      orcid_identifier: null,
      department: 'Faculty of Law',
      positions: 'Lecturer (T&A)',
      bio: '',
      research_area: '',
      research_tags: '',
    },
    {
      usertypeid: 1,
      institution_id: 7,
      first_name: 'Gloria',
      last_name: 'Hao',
      title: 'Dr',
      primary_email: 'gloria.hao@lincoln.ac.nz',
      orcid_identifier: null,
      department: '',
      positions: 'Senior Lecturer',
      bio: 'My specialist area is financial accounting, with an interest in accounting theory, financial reporting, IFRSs, agricultural accounting, accounting education and information disclosure. In my over twenty years of accounting teaching, at both graduate and undergraduate levels in China and New Zealand, I have realised that I profoundly love teaching and am strongly willing to help my students grow. I am a member of CPA Australia and Chartered Accountants Australia and New Zealand (CAANZ). My research, which includes financial accounting, accounting education, and financial management, has resulted in many publications in professional journals and presiding and participating in research projects. I have edited several accounting finance textbooks and Accounting Principles of which I was the principal editor, was the recommended tertiary level textbook in China.',
      research_area: 'Commerce, management, tourism and services, Accounting, auditing and accountability',
      research_tags: 'Education, Financial accounting',
    },
    {
      usertypeid: 1,
      institution_id: 7,
      first_name: 'Khanh (Harry)',
      last_name: 'Hoang',
      title: 'Dr',
      primary_email: 'Khanh.Hoang@lincoln.ac.nz',
      orcid_identifier: '0000-0002-5570-9303',
      department: '',
      positions: 'Senior Lecturer',
      bio: 'I am an active researcher in the field of corporate finance, business uncertainty, corporate social responsibility, and sustainable finance. My current research topics include how corporate financial policies respond to changes in macroeconomic conditions and government policies. My research works are published in international peer-reviewed journals in the ABDC Journal Ranking List, including Journal of Accounting and Public Policy, International Review of Economics and Finance, Journal of Behavioral & Experimental Finance, Global Finance Journal, Evaluation Review, Finance Research Letters, International Journal of Emerging Markets, Economic Analysis and Policy, Managerial and Decision Economics, among others. Regarding my services to the academic community, I serve as an Associate Editor of the Economic-Financial section of PLOS ONE journal, a Co-Guest Editor for special issues published in some academic journals in the ABDC list, including Research in International Business & Finance and Journal of Chinese Business and Economic Studies. I also contribute as an adhoc reviewer for Journal of Economic Behavior and Organization, Empirical Economics, European Financial Management, Annals of Operations Research, Evaluation Review, etc. I also contribute as a referee for Vietnam\'s National Foundation for Science and Technology Development, and act as one of the managers in the Finance and Banking Network (AVSE Global).',
      research_area: 'Banking, finance and investment, Applied economics, Commerce, management, tourism and services, Strategy, management and organisational behaviour, Economics',
      research_tags: 'Finance, Environment and climate finance, Corporate social responsibility, Financial economics',
    },

        {
          usertypeid: 1,
          institution_id: 6,
          first_name: 'Chat',
          last_name: 'Nguyen',
          title: 'Doctor',
          primary_email: 'chat.nguyen@canterbury.ac.nz',
          orcid_identifier: '0000-0001-5673-3172',
          department: 'Faculty of Law',
          positions: 'Senior Lecturer',
          bio: 'I taught at the University of the South Pacific prior to joining the University of Canterbury. I have worked with the United Nations Office on Drugs and Crime (UNODC), the Jean Monnet Actions, and Transparency International in a number of teaching initiatives and research projects on Anti-Money Laundering/Terrorist Financing, Corruption, Transnational Organised Crime, and Cybercrime in the Asia-Pacific region.',
          research_area: '',
          research_tags: '',
        },
        {
          usertypeid: 1,
          institution_id: 6,
          first_name: 'Frank',
          last_name: 'Owen',
          title: 'Mr',
          primary_email: 'frank.owen@canterbury.ac.nz',
          orcid_identifier: null,
          department: 'UC Business School',
          positions: 'Adjunct Appointment',
          bio: '',
          research_area: '',
          research_tags: '',
        },
        {
          usertypeid: 1,
          institution_id: 6,
          first_name: 'Veil',
          last_name: 'Pacanza',
          title: 'Mr',
          primary_email: 'veil.pacanza@canterbury.ac.nz',
          orcid_identifier: null,
          department: 'Faculty of Law',
          positions: 'LawME Mentor',
          bio: '',
          research_area: '',
          research_tags: '',
        },
        {
          usertypeid: 1,
          institution_id: 6,
          first_name: 'Christian',
          last_name: 'Riffel',
          title: 'Doctor',
          primary_email: 'christian.riffel@canterbury.ac.nz',
          orcid_identifier: '0000-0002-4105-7324',
          department: 'Faculty of Law',
          positions: 'Professor',
          bio: 'Chris is Co-Director of Postgraduate Studies in Law and Associate Editor of the NZ Yearbook of International Law. He did his PhD under the supervision of Prof Thomas Cottier and authored Protection Against Unfair Competition in the WTO TRIPS Agreement (Brill 2016). He is a contributor to the Max Planck Encyclopedia of Public International Law and has published in leading international law journals, such as the ICLQ, the German Law Journal, the JIEL, the European Law Review, Legal Issues of Economic Integration, and the Max Planck Yearbook of United Nations Law. In addition, Chris is on the indicative list of suitable arbitrators for EU trade agreements and was WTI Advisor to the EU in the negotiations for a trade agreement with New Zealand. He is the Regional Advisor for the Encyclopedia of Comparative Constitutional Law and Co-Chair of the International Economic Law Interest Group of the Australian and New Zealand Society of International Law. Chris was also a member of the ILA Committee on Rule of Law and International Investment Law until its conclusion in 2024. Before joining UC, he was a postgraduate worker at the University of Edinburgh. Chris studied law at the University of Heidelberg, where he minored in environmental studies, Anglo-American and French law, and attended the summer course in public international law at The Hague Academy of International Law. He did his master’s degree at the Europa-Institut of Saarland University. His master’s thesis won the Hans-Werner Osthoff prize for excellent academic writing. Chris worked as a legal clerk for Baker McKenzie in Caracas, Venezuela, as well as in the German Embassy in Santiago de Chile. He is fluent in English, German, and Spanish. Chris serves as the Honorary Consul of Germany in the South Island.',
          research_area: '',
          research_tags: '',
        },
        {
          usertypeid: 1,
          institution_id: 7,
          first_name: 'Cuong',
          last_name: 'Nguyen',
          title: 'Assoc. Prof.',
          primary_email: 'Cuong.Nguyen@lincoln.ac.nz',
          orcid_identifier: '0000-0002-7563-2374',
          department: '',
          positions: 'Associate Professor',
          bio: 'I am an Associate Professor in Finance & FinTech at Lincoln University, New Zealand and recipient of Australian Leadership Awards. I am also a research fellow for “Stochastics with Emphasis on Finance” at the Austrian Academy of Sciences-OAW and Johann Radon Institute for Computational and Applied Mathematics RICAM and for “Risk Theory and Related Topics” at the European Mathematical Society and Institute of Mathematics Polish Academy of Sciences-IMPAN, Poland 2008. My research interests broadly lie in financial econometrics, financial markets and financial technologies. My work has appeared at the Journal of International Financial Markets, Institutions and Money, International Journal of Economics and Finance, Quality & Quantity: International Journal of Methodology, Emerging Market Finance and Trade, Economic Modeling, Journal of Economics and Finance, the Journal of Statistical Theory and Applications, and Financial Research Letters. I have also served as an ad-hoc reviewer for several international academic journals in finance, statistics, accounting, and economics, such as the Journal of Banking and Finance, International Journal of Economics and Finance, International Review of Economics and Finance, International Review of Financial Analysis, Australian Journal of Agricultural and Resource Economics, Economic Systems, Applied Economics, Physica A: Statistical Mechanics and its Applications and Emerging Markets Review. I supervised more than 15 PhD students, two of whom are currently teaching at Otago University and Auckland University of Technology. I also received the Postgraduate Publication Research Award 2016 from the Faculty of Agribusiness and Commerce, Lincoln University.',
          research_area: 'Commerce, management, tourism and services, Banking, finance and investment, Applied economics, Economics',
          research_tags: 'Banking, finance and investment, Finance, Financial econometrics, International finance, International economics',
        },
        {
          usertypeid: 1,
          institution_id: 7,
          first_name: 'Michael',
          last_name: 'Zhang',
          title: 'Dr',
          primary_email: 'Yuqian.Zhang@lincoln.ac.nz',
          orcid_identifier: '0000-0001-5667-4002',
          department: '',
          positions: 'Senior Lecturer',
          bio: 'I am an interdisciplinary accounting scholar. My research focuses on contemporary accounting issues, with a particular emphasis on the behavioural aspects of accounting information processing, big data and the implementation of blockchain technology in accounting. My passion for research stems from a desire to understand and explore the fundamental issues regarding accounting numbers, uncertainty expressions, linguistic impact, and information recording systems. Most of my research is interdisciplinary in nature and employs both quantitative and qualitative methods. This results in my research contribution to both the theory and practise of international accounting. My works have been published in journals such as Meditari Accountancy Research, Accounting Research Journal, Industrial Management & Data Systems, Journal of Corporate Accounting and Finance, and Australasian Accounting, Business and Finance Journal. I have also served as an ad-hoc reviewer for several accounting and ethics journals, such as Business Ethics, the Environment and Responsibility. I have been active in engaging with stakeholders in both academic and industrial sectors, and have experience in PhD supervision and executive training.',
          research_area: 'Commerce, management, tourism and services, Accounting, auditing and accountability',
          research_tags: 'Accounting theory and standards, Auditing and accountability, Financial accounting, International accounting, Management accounting',
        },
      ];
    
      for (const profile of userProfiles) {
        await await prismaClient.user_profile.create({
          data: profile,
        });
      }
    }
  
    
}

main()
  .catch((ex) => {
    console.error(ex);

  })
  .finally(async () => {
    await disconnect();
  });
