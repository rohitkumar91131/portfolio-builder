import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// Create styles (CSS-like)
const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, textAlign: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, textTransform: 'uppercase' },
  subHeader: { fontSize: 10, color: 'gray', marginBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 15, marginBottom: 6, borderBottom: '1px solid black', paddingBottom: 2 },
  
  // Content Items
  itemContainer: { marginBottom: 8 },
  itemTitleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontSize: 12, fontWeight: 'bold' },
  itemDate: { fontSize: 10, color: 'gray' },
  itemSubTitle: { fontSize: 10, fontStyle: 'italic', marginBottom: 2 },
  itemDesc: { fontSize: 10, lineHeight: 1.4, color: '#333' },
  
  // Tech Stack pills
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  techItem: { fontSize: 8, backgroundColor: '#eee', padding: '2 4', borderRadius: 4 },
  
  link: { color: 'blue', textDecoration: 'none', fontSize: 10 }
});

// The Actual PDF Component
export const ResumeDocument = ({ projects, education }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.name}>Rohit Kumar</Text>
        <Text style={styles.subHeader}>Full Stack Developer | React, Next.js, Node.js</Text>
        <Text style={{ fontSize: 10 }}>
           rk34190100@gmail.com  |  github.com/rohitkumar91131
        </Text>
      </View>

      {/* --- EDUCATION SECTION --- */}
      <Text style={styles.sectionTitle}>EDUCATION</Text>
      {education.map((edu, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.itemTitleRow}>
            <Text style={styles.itemTitle}>{edu.degree}</Text>
            <Text style={styles.itemDate}>{edu.startYear} - {edu.endYear}</Text>
          </View>
          <Text style={styles.itemSubTitle}>{edu.institution}</Text>
          <Text style={styles.itemDesc}>{edu.description}</Text>
        </View>
      ))}

      {/* --- PROJECTS SECTION --- */}
      <Text style={styles.sectionTitle}>PROJECTS</Text>
      {projects.map((proj, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.itemTitleRow}>
            <Text style={styles.itemTitle}>{proj.title}</Text>
            {proj.liveLink && (
              <Link src={proj.liveLink} style={styles.link}>Live Demo</Link>
            )}
          </View>
          <Text style={styles.itemDesc}>{proj.description}</Text>
          
          {/* Tech Stack List */}
          <View style={styles.techRow}>
            {proj.tech.map((t, i) => (
              <Text key={i} style={styles.techItem}>{t}</Text>
            ))}
          </View>
        </View>
      ))}

    </Page>
  </Document>
);